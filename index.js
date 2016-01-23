'use strict';
const Vector2d = require('geometry-vector2d');

// Line intersects
/*
p1, p2 belong to first line
p3, p4 belong to second line
*/
function pointOfLinesIntersect(p1, p2, p3, p4) {
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

/*
point - point that belongs to line (begin, direction)
begin, direction belong to ray (starts in begin directed to direction)
return true if belongs otherwise false
*/
function pointBelongsToRay(point, begin, direction) {
	if(begin.y == direction.y) {
		if(begin.x == direction.x) {
			return false;
		}
		if(begin.x < direction.x) {
			if(point.x < begin.x) {
				return false;
			}
		}
		if(point.x > begin.x) {
			return false;
		}
	}
	if(begin.x == direction.x) {
		if(begin.y < direction.y) {
			if(point.y < begin.y) {
				return false;
			}
		}
		if(point.y > begin.y) {
			return false;
		}
	}
	let quarterOfPoint = Vector2d.getQuarterAccording(point, begin),
		quarterOfDirection = Vector2d.getQuarterAccording(direction, begin);
	if(quarterOfPoint != quarterOfDirection) {
		return false;
	}
	return true;
}

/*
point - point that belongs to line (begin, end)
begin, end belong to segment (starts in begin and ends in end)
return true if belongs otherwise false
*/
function pointBelongsToSegment(point, begin, end) {
	return pointBelongsToRay(point, begin, end) && pointBelongsToRay(point, end, begin);
}

/*
p1, p2 belong line
begin, direction belong to ray (starts in begin directed to direction)
*/
function pointOfLineAndRayIntersect(p1, p2, begin, direction) {
	let point = pointOfLinesIntersect(p1, p2, begin, direction);
	if(point != undefined) {
		if(pointBelongsToRay(point, begin, direction) == false) {
			point = undefined;
		}
	}
	return point;
}

/*
begin1, direction1 belong to ray (starts in begin1 directed to direction1)
begin2, direction2 belong to ray (starts in begin2 directed to direction2)
*/
function pointOfRaysIntersect(begin1, direction1, begin2, direction2) {
	let point = pointOfLineAndRayIntersect(begin1, direction1, begin2, direction2);
	if(point != undefined) {
		if(pointBelongsToRay(point, begin1, direction1) == false) {
			point = undefined;
		}
	}
	return point;
}

/*
p1, p2 belong to line
begin, end belong to segment
*/
function pointOfLineAndSegmentIntersect(p1, p2, begin, end) {
	let point = pointOfLinesIntersect(p1, p2, begin, end);
	if(point != undefined) {
		if(pointBelongsToSegment(point, begin, end) == false) {
			point = undefined;
		}
	}
	return point;
}

/*
begin1, direction1 belong to ray (starts in begin1 directed to direction1)
begin2, end2 belong segment
*/
function pointOfRayAndSegmentIntersect(begin1, direction1, begin2, end2) {
	let point = pointOfLineAndSegmentIntersect(begin1, direction1, begin2, end2);
	if(point != undefined) {
		if(pointBelongsToRay(point, begin1, direction1) == false ) {
			point = undefined;
		}
	}
	return point;
}

/*
begin1, end1 belong to first segment
begin2, end2 belong to second segment
*/
function pointOfSegmentsIntersect(begin1, end1, begin2, end2) {
	let point = pointOfLineAndSegmentIntersect(begin1, end1, begin2, end2);
	if(point != undefined) {
		if(pointBelongsToSegment(point, begin1, end1) == false ) {
			point = undefined;
		}
	}
	return point;
}

module.exports = {
	pointOfLinesIntersect: pointOfLinesIntersect,
	pointOfLineAndRayIntersect: pointOfLineAndRayIntersect,
	pointOfRaysIntersect: pointOfRaysIntersect,
	pointOfLineAndSegmentIntersect: pointOfLineAndSegmentIntersect,
	pointOfRayAndSegmentIntersect: pointOfRayAndSegmentIntersect,
	pointOfSegmentsIntersect: pointOfSegmentsIntersect,
	getXInLine: getXInLine,
	getYInLine: getYInLine
};