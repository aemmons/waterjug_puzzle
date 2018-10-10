from flask import Flask, render_template, jsonify

from puzzle import isSolvable, JugPuzzle

app = Flask(__name__)

@app.route("/find-path/<int:mjug>/<int:njug>/<int:goal>/")
def find_path(mjug, njug, goal):

    if not isSolvable(mjug, njug, goal):
        return jsonify(**{
            "status": "fail",
            "message": "Invalid input params."
        }), 400

    jp = JugPuzzle(mjug, njug, goal)
    path = jp.findBestPath()
    return jsonify(**{
        "status": "success",
        "payload": {
            "path": path
        }
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0")