import fractions

from ..node import Node


def isSolvable(m, n, d):
    """
    Decide if problem has a solution.

    @type m: int
    @param m: the first jug size
    @type n: int
    @param n: the second jug size
    @type d: int
    @param d: goal volume of water
    @rtype: bool
    @returns: a boolean, true if the goal state is achievable.
    """
    gcd = fractions.gcd(m, n)

    return (
        # small jug is greater or equal to goal
        ((m > n) and n >= d) or ((n > m) and m >= d) \
        # greated common denominator is less than or equal to goal
        and gcd <= d \
        # goal is divided evenly by greatest common denominator
        and (d % gcd) == 0 \
    )

def generateProblemSpace(m, n):
    """
    Create the entire search spcae of possible states given the two jug sizes.

    @type m: int
    @param m: the first jug size
    @type n: int
    @param n: the second jug size
    @rtype: list
    @return: list of tuples of all possible states.
    """
    return [(i,j) for i in range(m+1) for j in range(n+1)]

class JugPuzzle:

    def __init__(self, m, n, d):
        self._m = m
        self._n = n
        self._goal = d

    def findBestPath(self):
        """
        Perform search of problem space for most efficient path to goal.

        @rtype: List
        @returns: list of steps to goal
        """
        searchTree = Node({"step": (0,0), "text": "Start"})
        nextLeaves = [searchTree] # 
        visited = set([(0,0)])

        if not isSolvable(self._m, self._n, self._goal):
            return None

        while nextLeaves:
            leaf = nextLeaves.pop()
            print leaf.value
            nextSteps = self.findPossibleNextSteps(leaf.value["step"])

            for s in nextSteps:

                # Don't revisit seen nodes in search space.
                if s["step"] not in visited:
                    newNode = Node(s)
                    leaf.addChild(newNode)

                    # Exit case
                    if self._goal in s["step"]:
                        return newNode.getPath()

                    visited.add(s["step"])
                    nextLeaves.insert(0, newNode)

        return None

    def findPossibleNextSteps(self, node):
        """
        Using the possible actions, find viable next steps.
        """
        actions = [
            (self.fillM, "Fill M Jug"), 
            (self.fillN, "Fill N Jug"),
            (self.emptyM, "Empty M jug"),
            (self.emptyN, "Empty N jug"),
            (self.transferM2N, "Full Transfer from M to N"),
            (self.transferN2M, "Full Transfer from N to M"),
            (self.pTransferM2N, "Partial Transfer M to N"),
            (self.pTransferN2M, "Partial Transfer N to M")
        ]
        nextStates = []

        for action, text in actions:
            possible, state = action(node)

            if possible:
                nextStates.append({"step": state, "text": text})

        return nextStates

    def fillM(self, state):
        if state[0] < self._m:
            newState = (self._m, state[1],)
            return True, newState
        return False, None

    def fillN(self, state):
        if state[1] < self._n:
            newState = (state[0], self._n)
            return True, newState
        return False, None

    def emptyM(self, state):
        if state[0] > 0:
            newState = (0, state[1])
            return True, newState
        return False, None

    def emptyN(self, state):
        if state[1] > 0:
            newState = (state[0], 0,)
            return True, newState
        return False, None

    def transferM2N(self, state):
        newN = state[0] + state[1]
        if state[0] > 0 and (newN <= self._n):
            newState = (0, newN)
            return True, newState
        return False, None

    def transferN2M(self, state):
        newM = state[0] + state[1]
        if state[1] > 0 and (newM <= self._m):
            newState = (newM, 0)
            return True, newState
        return False, None

    def pTransferM2N(self, state):
        togo = self._n - state[1]
        if state[0] > 0 and state[1] < self._n:
            newM =  state[0] - togo if togo < state[0] else 0
            newN = self._n if state[0] >= togo else state[0] + state[1]
            return True, (newM, newN,)
        return False, None

    def pTransferN2M(self, state):
        togo = self._m - state[0]
        if state[1] > 0 and state[0] < self._m:
            newM = self._m if state[1] >= togo else state[0] + state[1]
            newN = state[1] - togo if togo < state[1] else 0
            return True, (newM, newN,)
        return False, None