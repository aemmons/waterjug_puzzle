import pytest

from ..puzzle import JugPuzzle, isSolvable, generateProblemSpace

def test_isSolvable():
    assert isSolvable(6, 10, 2) == True
    assert isSolvable(9, 14, 10) == True
    assert isSolvable(9, 14, 0) == False

def test_init():
    p = JugPuzzle(4,3,2)
    assert p._m == 4
    assert p._n == 3
    assert p._goal == 2

def test_findBestPath():
    expected = [
        {"step": (0,0), "text": "Start"},
        {"step": (0,3), "text": "Fill N Jug"},
        {"step": (3,0), "text": "Full Transfer from N to M"},
        {"step": (3,3), "text": "Fill N Jug"},
        {"step": (4,2), "text": "Partial Transfer N to M"},
        {"step": (4,2), "text": "GOAL!"}
    ]
    p = JugPuzzle(4,3,2)
    path = p.findBestPath()

    assert path == expected

def test_findPossibleNextSteps():
    p = JugPuzzle(4,3,2)

    steps = p.findPossibleNextSteps((0,0))
    assert {"step": (0,3), "text": "Fill N Jug"} in steps
    assert {"step": (4,0), "text": "Fill M Jug"} in steps
    assert len(steps) == 2

def test_fillM():
    p = JugPuzzle(4,3,2)

    # fills M
    possible, newState = p.fillM((0,0))

    assert possible == True
    assert newState == (4,0)

    # fills partial M
    possible, newState = p.fillM((3,1))

    assert possible == True
    assert newState == (4,1)

    # does not fill full M
    possible, newState = p.fillM((4,0))

    assert possible == False
    assert newState is None

def test_fillN():
    p = JugPuzzle(4,3,2)

    # fills empty N
    possible, newState = p.fillN((0,0))

    assert possible == True
    assert newState == (0,3)

    # fills partial N
    possible, newState = p.fillN((2, 1))

    assert possible == True
    assert newState == (2,3)

    # does not fill full N
    possible, newState = p.fillN((0, 3))

    assert possible == False
    assert newState is None

def test_emptyM():
    p = JugPuzzle(4,3,2)

    # empties full M
    possible, newState = p.emptyM((4,0))

    assert possible == True
    assert newState == (0,0)

    # empties partial M
    possible, newState = p.emptyM((2,2))

    assert possible == True
    assert newState == (0,2)

    # does not empty empty M
    possible, newState = p.emptyM((0,2))

    assert possible == False
    assert newState is None

def test_emptyN():
    p = JugPuzzle(4,3,2)

    # empties full N
    possible, newState = p.emptyN((0,3))

    assert possible == True
    assert newState == (0,0)

    # empties partial N
    possible, newState = p.emptyN((2,2))

    assert possible == True
    assert newState == (2,0)

    # does not empty empty N
    possible, newState = p.emptyN((2,0))

    assert possible == False
    assert newState is None

def test_transferM2N():
    p = JugPuzzle(4,3,2)

    # transfer M to empty N
    possible, newState = p.transferM2N((3,0))

    assert possible == True
    assert newState == (0,3)

    # transfer M to partial N
    possible, newState = p.transferM2N((2,1))

    assert possible == True
    assert newState ==  (0,3)

    # not possible, empty M
    possible, newState = p.transferM2N((0,2))

    assert possible == False
    assert newState is None

    # not possible, overflows N
    possible, newState = p.transferM2N((2,2))

    assert possible == False
    assert newState is None

def test_transferN2M():
    p = JugPuzzle(4,3,2)

    # transfer N to empty M
    possible, newState = p.transferN2M((0,3))

    assert possible == True
    assert newState == (3,0)

    # transfer N to partial M
    possible, newState = p.transferN2M((2,1))

    assert possible == True
    assert newState ==  (3,0)

    # not possible, empty N
    possible, newState = p.transferN2M((3,0))

    assert possible == False
    assert newState is None

    # not possible, overflows M
    possible, newState = p.transferN2M((2,3))

    assert possible == False
    assert newState is None

def test_pTransferM2N():
    p = JugPuzzle(4,3,2)

    possible, newState = p.pTransferM2N((3,2))

    assert possible == True
    assert newState == (2,3)

    possible, newState = p.pTransferM2N((2,1))

    assert possible == True
    assert newState == (0,3)

    # not possible, M empty
    possible, newState = p.pTransferM2N((0,2))

    assert possible == False
    assert newState is None

    # not possible, N full
    possible, newState = p.pTransferM2N((1,3))

    assert possible == False
    assert newState is None

def test_pTransferN2M():
    p = JugPuzzle(4,3,2)

    possible, newState = p.pTransferN2M((3,2))

    assert possible == True
    assert newState == (4,1)

    possible, newState = p.pTransferN2M((2,1))

    assert possible == True
    assert newState == (3,0)

    # not possible, N empty
    possible, newState = p.pTransferN2M((2,0))

    assert possible == False
    assert newState is None

    # not possible, M full
    possible, newState = p.pTransferN2M((4,1))

    assert possible == False
    assert newState is None