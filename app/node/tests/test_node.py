import pytest

from ..node import Node

def test_init():
    expected = (1,2)
    n = Node(expected)

    assert n.value == expected
    assert n.parent is None
    assert n.children == []

def test_addChild():
    n = Node((1,2))
    c = Node((4,5))
    n.addChild(c)

    assert c.parent == n
    assert c in n.children

def test_getPath():
    n = Node((1,2))
    c1 = Node((2,3))
    c2 = Node((3,4))
    c3 = Node((4,5))

    n.addChild(c1)
    c1.addChild(c2)
    c2.addChild(c3)

    path = c3.getPath()

    assert path == [n.value, c1.value, c2.value, c3.value]