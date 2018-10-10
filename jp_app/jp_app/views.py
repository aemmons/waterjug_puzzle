from flask import Flask, render_template, jsonify

from jp_app import app

from .puzzle import isSolvable, JugPuzzle


@app.route("/find-path/<int:mjug>/<int:njug>/<int:goal>/")
def find_path(mjug, njug, goal):

    if not isSolvable(mjug, njug, goal):
        return jsonify(**{
            "status": "fail",
            "message": "Invalid input params."
        }), 400

    jp = JugPuzzle(mjug, njug, goal)
    path = jp.findBestPath()

    if path is not None:
        return jsonify(**{
            "status": "success",
            "payload": {
                "path": path
            }
        })
    else:
        return jsonify(**{
            "status": "fail",
            "message": "No viable path."
        }), 400
