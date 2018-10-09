class Node:

    def __init__(self, val, parent=None, children=[]):
        self.__value = val
        self.__parent = parent
        self.__children = children

    def addChild(self, child):
        """
        Add child Node to the node's children

        @type child: Node
        @param child: child to add to children
        """
        self.__children.append(child)
        child.parent = self

    @property
    def value(self):
        """
        Getter for instance value

        @rtype: mixed
        @returns: the value attribute 
        """
        return self.__value

    @value.setter
    def value(self, val):
        """
        Setter for value attribute

        @type val: mixed
        @param val: value to assign to node
        """
        self.__value = val

    @property
    def children(self):
        """
        Returns the children of the node.

        @rtype: List
        @returns: the node's children 
        """
        return self.__children

    @property
    def parent(self):
        """
        Returns the node's parent.

        @rtype: Node
        @returns: the node's parent
        """
        return self.__parent

    @parent.setter
    def parent(self, parent):
        """
        Setter for parent property
        """
        self.__parent = parent

    def getPath(self):
        """
        Follow node's parents back to root, collecting the steps in the path along the way.

        @rtype: List
        @return: 
        """
        path = [self.value]
        node = self
        while node.parent:
            path.append(node.parent.value)
            node = node.parent

        path.reverse()
        return path


