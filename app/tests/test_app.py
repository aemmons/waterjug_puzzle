import pytest

from app import app

@pytest.fixture
def client():
    app.app.config['TESTING'] = True
    client = app.app.test_client()

    yield client

def test_find_path_200(client):
    resp = client.get("/find-path/4/3/2/")

    expected = [[ 0,0 ], [ 0,3 ], [ 3,0 ], [ 3,3 ], [ 4,2 ]]

    jsonData = resp.get_json()
    assert expected == jsonData["payload"]["path"]

def test_find_path_400(client):
    resp = client.get("/find-path/4/3/4/")

    jsonData = resp.get_json()
    code = resp.status_code
    assert code == 400
    assert jsonData["status"] == "fail"
    assert "Invalid" in jsonData["message"]