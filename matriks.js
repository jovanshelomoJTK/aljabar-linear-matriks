class Matrix {
    rows = 0;
    cols = 0;
    data = [];
	
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.data = Array.from(new Array(this.rows), () => new Array(this.cols));
		return this;
	}

	setColumn(index, data) {
		if (index >= this.cols || index < 0) {
			console.log("cannot set column at unexisting index");
			return;
		} else if (data.length !== this.rows) {
			console.log("cannot set column of length other than matrix column length");
			return;
		} else {
			this.map((e, i, j) => {
				if (j === index) {
					return data[i];
				} else {
					return e;
				}
			})
		}
		return this;
	}

	getColumn(index) {
		let result = [];
		if (index >= this.cols || index < 0) {
			console.log("cannot set column at unexisting index");
			return;
		} else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					if (j === index) {
						result.push(this.data[i][j]);
					}
				}
			}
		}
		return result;
	}

	addColumn(data) {
		if(data.length !== this.rows) {
			console.log("cannot add invalid column");
			return;
		} else {
			for (let i = 0; i < this.rows; i++) {
				this.data[i].push(data[i]);
			}
			this.cols++;
			return this;
		}
	}

	setRow(index, data) {
		if (index >= this.rows || index < 0) {
			console.log("cannot set row at unexisting index");
			return;
		} else if (data.length !== this.cols) {
			console.log("cannot set row of length other than matrix row length");
			return;
		} else {
			this.map((e, i, j) => {
				if (i === index) {
					return data[j];
				} else {
					return e;
				}
			})
		}
		return this;
	}

	getRow(index) {
		let result = [];
		if (index >= this.rows || index < 0) {
			console.log("cannot set row at unexisting index");
			return;
		} else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					if (i === index) {
						result.push(this.data[i][j]);
					}
				}
			}
		}
		return result;
	}

	addRow(data) {
		if(data.length !== this.cols) {
			console.log("cannot add invalid row");
			return;
		} else {
			this.data.push(data);
			this.rows++;
			return this;
		}
	}

	setData(data){
		this.data = data;
		return this;
	}

	add(value) {
		if (value instanceof Matrix) {
			if (value.rows !== this.rows || value.cols !== this.cols) {
				console.log("invalid matrix");
				return;
			}
			this.map((e, i, j) => e + value.data[i][j]);
		} else if (!isNaN(value)) {
			this.map(e => e + value);
		}
		return this;
	}

	static add(matrix, value) {
		if (value instanceof Matrix && matrix instanceof Matrix) {
			if (value.rows !== matrix.rows || value.cols !== matrix.cols) {
				console.log("invalid matrixes")
				return;
			}
			return new Matrix(matrix.rows, matrix.cols)
				.map((e, i, j) => matrix.data[i][j] + value.data[i][j]);
		} else if (!isNaN(value)) {
			return new Matrix(matrix.rows, matrix.cols)
				.map(e => matrix.data[i][j] + value);
		}
	}

	subtract(value) {
		if (value instanceof Matrix) {
			if (value.rows !== this.rows || value.cols !== this.cols) {
				console.log("invalid matrix");
				return;
			}
			this.map((e, i, j) => e - value.data[i][j]);
		} else if (!isNaN(value)) {
			this.map(e => e - value);
		}
		return this;
	}

	static subtract(matrix, value) {
		if (value instanceof Matrix && matrix instanceof Matrix) {
			if (value.rows !== matrix.rows || value.cols !== matrix.cols) {
				console.log("invalid matrixes")
				return;
			}
			return new Matrix(matrix.rows, matrix.cols)
				.map((e, i, j) => matrix.data[i][j] - value.data[i][j]);
		} else if (!isNaN(value)) {
			return new Matrix(matrix.rows, matrix.cols)
				.map(e => matrix.data[i][j] - value);
		}
	}

	multiply(value) {
		if (value instanceof Matrix) {
			if (value.rows !== this.rows || value.cols !== this.cols) {
				console.log("invalid matrix");
				return;
			}
			this.map((e, i, j) => e * value.data[i][j]);
		} else if (!isNaN(value)) {
			this.map(e => e * value);
		}
		return this;
	}

	static multiply(a, b) {
		if (a instanceof Matrix && b instanceof Matrix) {
			if (a.cols !== b.rows) {
				console.log("invalid matrixes");
				return;
			}
			return new Matrix(a.rows, b.cols)
				.map((e, i, j) => {
					let result = 0;
					for (let k = 0; k < a.cols; k++) {
						result += a.data[i][k] * b.data[k][j];
					}
					return result;
				});
		}
	}

	map(func) {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let value = this.data[i][j];
				this.data[i][j] = func(value, i, j);
			}
		}
		return this;
	}

	static map(matrix, func) {
		if (matrix instanceof Matrix) {
			return new Matrix(matrix.rows, matrix.cols)
				.map((e, i, j) => func(matrix.data[i][j]));
		}
	}

	static getDeterminantOf(matrix) {
		if (matrix.rows !== matrix.cols) {
			console.log("cannot get determinant of a non square matrix");
			return;
		}
		if (matrix.rows === 2 && matrix.cols === 2) {
			return matrix.getDeterminant2x2();
		} else {
			let determinant = 0;
			for (let i = 0; i < matrix.cols; i++) {
				if (i % 2 === 0) {
					determinant += matrix.data[0][i] * Matrix.getDeterminantOf(matrix.ignoreRowColumn(0, i));
				} else {
					determinant -= matrix.data[0][i] * Matrix.getDeterminantOf(matrix.ignoreRowColumn(0, i));
				}
			}
			return determinant;
		}
	}

	getDeterminantCofactorExpansion() {
		if(this.rows !== this.cols) {
			console.log("cannot find determinant of a non square matrix");
			return;
		}
		if(this.rows === 2 && this.cols === 2) {
			return this.getDeterminant2x2();
		} else {
			let determinant = 0;
			for(let i = 0; i < this.cols; i++) {
				if(i % 2 === 0) {
					determinant += this.data[0][i] * this.ignoreRowColumn(0, i).getDeterminantCofactorExpansion();
				} else {
					determinant -= this.data[0][i] * this.ignoreRowColumn(0, i).getDeterminantCofactorExpansion();
				}
			}
			return determinant;
		}
	}

	getDeterminantRowReduction() {
		if(this.rows !== this.cols) {
			console.log("cannot find determinant of a non square matrix");
			return;
		}
		let triangle = this.clone().topTriangle();
		let determinant = 1;
		for(let i = 0; i < triangle.rows; i++) {
			determinant *= triangle.data[i][i];
		}
		return determinant;
	}

	getDeterminant2x2() {
		if (this.rows !== this.cols) {
			console.log("cannot find determinant of a non square matrix");
			return;
		} else if (this.rows !== 2) {
			console.log("cannot calculate determinant of a matrix with dimensions other than 2x2 with this function.");
			return;
		} else {
			return this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0];
		}
	}

	ignoreColumn(index) {
		if (index >= this.cols || index < 0) {
			console.log("cannot remove column at unexisting index");
			return;
		} else {
			let result = new Matrix(this.cols - 1, this.rows);
			result.data = [];
			for (let i = 0; i < this.cols; i++) {
				if (i !== index) {
					result.data.push(this.getColumn(i));
				}
			}
			return Matrix.transpose(result);
		}
	}

	ignoreRow(index) {
		if (index >= this.rows || index < 0) {
			console.log("cannot remove row at unexisting index");
			return;
		} else {
			let result = new Matrix(this.rows - 1, this.cols);
			result.data = [];
			for (let i = 0; i < this.rows; i++) {
				if (i !== index) {
					result.data.push(this.getRow(i));
				}
			}
			return result;
		}
	}

	ignoreRowColumn(rowIndex, colIndex) {
		return this.ignoreRow(rowIndex).ignoreColumn(colIndex);
	}

	getCofactor() {
		let result = new Matrix(this.rows, this.cols);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if ((i + j) % 2 === 0) {
					result.data[i][j] = Matrix.getDeterminantOf(this.ignoreRowColumn(i, j));
				} else {
					result.data[i][j] = -Matrix.getDeterminantOf(this.ignoreRowColumn(i, j));
				}
			}
		}
		return result;
	}

	getAdjoin() {
		return Matrix.transpose(this.getCofactor());
	}

	invertGaussJordan() {
		if (this.rows !== this.cols) {
			console.log("cannot invert a non square matrix");
			return;
		} else if(this.getDeterminantCofactorExpansion() === 0) {
			console.log("cannot invert a matrix with determinant 0");
			return;
		} else {
			let result = Matrix.identity(this.rows);
			for (let i = 0; i < this.cols; i++) {
				if (this.data[i][i] === 0) {
					for (let j = 0; j < this.rows; j++) {
						if (j === i) continue;
						else if (this.data[j][i] !== 0) {
							this.swapRows(j, i);
							result.swapRows(j, i);
						}
					}
				}
				// 2(a)
				let multNum = 1 / this.data[i][i];
				this.multiplyRowByConst(i, multNum);
				result.multiplyRowByConst(i, multNum);
				for (let j = 0; j < this.rows; j++) {
					if(j !== i) {
						let numToMakeNull = this.data[j][i];
						this.addMultipleOfRow(j, i, -numToMakeNull);
						this.data[j][i] = 0;
						result.addMultipleOfRow(j, i, -numToMakeNull);
					}
				}
			}
			this.data = result.data;
			return this;
		}
	}

	invertAdj() {
		let determinant = this.getDeterminantCofactorExpansion();
		if (this.rows !== this.cols) {
			console.log("cannot invert a non square matrix");
			return;
		} else if(determinant === 0) {
			console.log("cannot invert a matrix with determinant 0");
			return;
		} else {
			let multiplier = 1 / determinant;
			this.data = this.getAdjoin().multiply(multiplier).data;
			return this;
		}
	}

	// row elementary operations
	swapRows(r1, r2) {
		if (r1 >= this.rows || r2 >= this.rows || r1 < 0 || r2 < 0) {
			console.log("cannot swap unexisting rows, index out of range")
			return;
		} else {
			let row1 = this.getRow(r1);
			let row2 = this.getRow(r2);

			this.setRow(r1, row2);
			this.setRow(r2, row1);
		}
		return this;
	}

	multiplyRowByConst(r, constant) {
		if (r < 0 || r >= this.rows) {
			console.log("cannot multiply unexisting row by " + constant + ", index out of range");
			return;
		} else {
			this.map((e, i, j) => {
				if (i === r) {
					return e * constant;
				} else {
					return e;
				}
			});
		}
		return this;
	}

	addMultipleOfRow(r1, r2, constant) {
		if (r1 >= this.rows || r2 >= this.rows || r1 < 0 || r2 < 0) {
			console.log("cannot cannot apply operation on unexisting rows, index out of range");
			return;
		} else {
			let row = this.getRow(r2);
			this.map((e, i, j) => {
				if (i === r1) {
					return e + row[j] * constant;
				} else {
					return e;
				}
			});
		}
		return this;
	}

	randomize(min, max, integerOnly = true) {
		if(integerOnly){
			this.map(e => Math.floor(Math.random() * (max - min + 1)) + min);
		}else{
			this.map(e => Math.random() * (max - min + 1) + min);
		}
		return this;
	}

	print() {
		console.table(this.clone().map(e => +e.toFixed(2) || 0).data);
	}

	transpose() {
		this.data = new Matrix(this.cols, this.rows).map((e, i, j) => this.data[j][i]).data;
		return this;
	}

	static transpose(matrix) {
		if (matrix instanceof Matrix) {
			return new Matrix(matrix.cols, matrix.rows).map((e, i, j) => matrix.data[j][i]);
		}
	}

	static identity(dimentions) {
		let result = new Matrix(dimentions, dimentions);
		result.map((e, i, j) => {
			if (i === j) {
				return 1;
			} else {
				return 0;
			}
		});
		return result;
	}

	topTriangle() {
		let found = false;
		for (let n =  0; n < this.rows; n++) {
			if(this.data[n][n] === 0){
				found = false;
				let i = n+1;
				while(!found && i < this.rows){
					if(this.data[i][n] != 0){
						found = true;
						this.addMultipleOfRow(n, i, 1);
					}
					i++;
				}
				if(!found){
					console.log("no solution");
					return;
				}
			}
			for (let i = n+1; i < this.rows; i++) {
				if(this.data[i][n] != 0){
					this.addMultipleOfRow(i, n, -this.data[i][n]/this.data[n][n]);
				}
			}
		}
		return this;
	}

	bottomTriangle() {
		let found = false;
		for (let n = this.rows-1; n >= 0; n--) {
			if(this.data[n][n] === 0){
				found = false;
				let i = n-1;
				while(!found && i >= 0){
					if(this.data[i][n] != 0){
						found = true;
						this.addMultipleOfRow(n, i, 1);
					}
					i--;
				}
				if(!found){
					console.log("no solution");
					return;
				}
			}
			for (let i = n-1; i >= 0; i--) {
				if(this.data[i][n] != 0){
					this.addMultipleOfRow(i, n, -this.data[i][n]/this.data[n][n]);
				}
			}
		}
		return this;
	}

	solveLinearSystemGaussJordan() {
		if (this.rows !== this.cols-1) {
			console.log("matrix is not a linear system, must be N x N+1");
			return;
		} else {
			for (let i = 0; i < this.cols-1; i++) {
				if (this.data[i][i] === 0) {
					for (let j = 0; j < this.rows; j++) {
						if (j === i) continue;
						else if (this.data[j][i] !== 0) {
							this.swapRows(j, i);
						}
					}
				}
				// 2(a)
				let multNum = 1 / this.data[i][i];
				this.multiplyRowByConst(i, multNum);
				for (let j = 0; j < this.rows; j++) {
					if (j === i) continue;
					else {
						let numToMakeNull = this.data[j][i];
						this.addMultipleOfRow(j, i, -numToMakeNull);
						this.data[j][i] = 0;
					}
				}
			}
			return this;
		}
	}

	clone() {
		return new Matrix(this.rows, this.cols)
			.map((e, i, j) => this.data[i][j]);
	}
}