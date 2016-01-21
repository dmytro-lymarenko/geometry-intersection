'use strict';
const Vector2d = require('geometry-vector2d');

// Line intersects
/*
p1, p2 belong to first line
p3, p4 belong to second line
*/
function pointOfLineIntersect(p1, p2, p3, p4) {
	if(p1.y == p2.y) {
		if(p3.y == p4.y) {
			return undefined;
		}
		if(p3.x == p4.x) {
			return Vector2d.getVectorXY(p3.x, p1.y);
		}
		let x = getXInLine(p3, p4, p1.y);
		if(x == undefined) {
			return undefined;
		}
		return Vector2d.getVectorXY(x, p1.y);
	}
	if(p3.y == p4.y) {
		if(p1.x == p2.x) {
			return Vector2d.getVectorXY(p1.x, p3.y);
		}
		let x = getXInLine(p1, p2, p3.y);
		if(x == undefined) {
			return undefined;
		}
		return Vector2d.getVectorXY(x, p3.y);
	}
	if(p1.x == p2.x) {
		if(p3.x == p4.x) {
			return undefined;
		}
		let y = getYInLine(p3, p4, p1.x);
		if(y == undefined) {
			return undefined;
		}
		return Vector2d.getVectorXY(p1.x, y);
	}
	if(p3.x == p4.x) {
		let y = getYInLine(p1, p2, p3.x);
		if(y == undefined) {
			return undefined;
		}
		return Vector2d.getVectorXY(p3.x, y);
	}
	let p2xp1x = p2.x - p1.x,
		p4yp3y = p4.y - p3.y,
		p4xp3x = p4.x - p3.x,
		p2yp1y = p2.y - p1.y,
		p3xp1x = p3.x - p1.x;

	let a = p2xp1x * p4yp3y * p1.y - p4xp3x * p2yp1y * p3.y +
			p2yp1y * p4yp3y * p3xp1x,
		b = p2xp1x * p4yp3y - p4xp3x * p2yp1y;
	if(b == 0) {
		return undefined;
	}
	let y = a / b;
	let x = getXInLine(p1, p2, y);
	if(x == undefined) {
		return undefined;
	}
	return Vector2d.getVectorXY(x, y);
}

function getXInLine(p1, p2, y) {
	if(p1.y != p2.y) {
		return p1.x + (p2.x - p1.x) * (y - p1.y) / (p2.y - p1.y);
	}
	return undefined;
}

function getYInLine(p1, p2, x) {
	if(p1.x != p2.x) {
		return p1.y + (p2.y - p1.y) * (x - p1.x) / (p2.x - p1.x);
	}
	return undefined;
}

module.exports = {
	pointOfLineIntersect: pointOfLineIntersect,
	getXInLine: getXInLine,
	getYInLine: getYInLine
};