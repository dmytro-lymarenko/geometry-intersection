'use strict';
require('proxyquire').noPreserveCache();
const should = require('should');

const intersection2d = require('../index');
const Vector2d = require('geometry-vector2d');

describe('geometry-intersection2d', () => {
	describe('.pointOfLinesIntersect', () => {
		it('should be an exported function', () => {
			should(intersection2d.pointOfLinesIntersect).be.a.Function();
		});

		it('should correctly calculate the point of intersection', () => {
			const poli = intersection2d.pointOfLinesIntersect;
			const v = Vector2d.getVectorXY;

			//should(poli(v(1, 1), v(1, 1), v(4, 6), v(-4, 3))).be.Undefined();

			should(poli(v(1, 0), v(1, 6), v(-1, 2), v(5, 2))).be.eql(v(1, 2));
			should(poli(v(-10, 4), v(-10, 9), v(5, 8), v(5, -4))).be.Undefined();
			//should(poli(v(, ), v(, ), v(, ), v(, ))).be.eql(v(, ));
			should(poli(v(-1, -1), v(-1, 8), v(1, 2), v(2, 4))).be.eql(v(-1, -2));
			should(poli(v(-4, 2), v(4, 2), v(2, 0), v(2, 9))).be.eql(v(2, 2));
			should(poli(v(-1, 5), v(5, 5), v(-10, -4), v(0, -4))).be.Undefined();
			should(poli(v(0, -3), v(4, -3), v(-1, 3), v(3, -1))).be.eql(v(5, -3));
			should(poli(v(-1, 3), v(3, -1), v(0, -3), v(4, -3))).be.eql(v(5, -3));
			should(poli(v(5, 6), v(2, -3), v(6, -1), v(3, 5))).be.eql(v(4, 3));
		});
	});

	describe('.getXInLine', () => {
		it('should be an exported function', () => {
			should(intersection2d.getXInLine).be.a.Function();
		});

		it('should correctly calculate the X of line', () => {
			const getXInLine = intersection2d.getXInLine;
			const v = Vector2d.getVectorXY;

			should(getXInLine(v(0, 0), v(0, 0), 0)).be.Undefined();
			should(getXInLine(v(0, 0), v(0, 0), 4)).be.Undefined();
			should(getXInLine(v(0, 0), v(0, 0), -3)).be.Undefined();

			should(getXInLine(v(0, 0), v(1, 1), 0)).be.eql(0);
			should(getXInLine(v(0, 0), v(1, 1), 5)).be.eql(5);
			should(getXInLine(v(0, 0), v(1, 1), -4)).be.eql(-4);
			should(getXInLine(v(5, 6), v(2, -3), 3)).be.eql(4);
			should(getXInLine(v(6, -1), v(3, 5), 3)).be.eql(4);

			should(getXInLine(v(0, 0), v(1, 0), 0)).be.Undefined();
			should(getXInLine(v(0, 0), v(1, 0), 4)).be.Undefined();
			should(getXInLine(v(0, 0), v(1, 0), -3)).be.Undefined();

			should(getXInLine(v(0, 0), v(0, 1), 0)).be.eql(0);
			should(getXInLine(v(0, 0), v(0, 1), 4)).be.eql(0);
			should(getXInLine(v(0, 0), v(0, 1), -8)).be.eql(0);
		});

		it('should correctly calculate the Y of line', () => {
			const getYInLine = intersection2d.getYInLine;
			const v = Vector2d.getVectorXY;

			should(getYInLine(v(0, 0), v(0, 0), 0)).be.Undefined();
			should(getYInLine(v(0, 0), v(0, 0), 4)).be.Undefined();
			should(getYInLine(v(0, 0), v(0, 0), -3)).be.Undefined();

			should(getYInLine(v(0, 0), v(1, 1), 0)).be.eql(0);
			should(getYInLine(v(0, 0), v(1, 1), 4)).be.eql(4);
			should(getYInLine(v(0, 0), v(1, 1), -3)).be.eql(-3);
			should(getYInLine(v(5, 6), v(2, -3), 4)).be.eql(3);
			should(getYInLine(v(6, -1), v(3, 5), 4)).be.eql(3);

			should(getYInLine(v(0, 0), v(1, 0), 0)).be.eql(0);
			should(getYInLine(v(0, 0), v(1, 0), 4)).be.eql(0);
			should(getYInLine(v(0, 0), v(1, 0), -3)).be.eql(0);

			should(getYInLine(v(0, 0), v(0, 1), 0)).be.Undefined();
			should(getYInLine(v(0, 0), v(0, 1), 4)).be.Undefined();
			should(getYInLine(v(0, 0), v(0, 1), -3)).be.Undefined();
		});
	});
});