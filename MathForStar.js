function TransMatrix(A)       //На входе двумерный массив
{
    var m = A.length, n = A[0].length, AT = [];
    for (var i = 0; i < n; i++)
     { AT[ i ] = [];
       for (var j = 0; j < m; j++) AT[ i ][j] = A[j][ i ];
     }
    return AT;
}


function MultiplyMatrix(A,B)
{
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[ i ] = [];
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var t = 0;
          for (var j = 0; j < rowsB; j++) t += A[ i ][j]*B[j][k];
          C[ i ][k] = t;
        }
     }
    return C;
}

function MultiplyMatrixVector(A,B)
{
    var value = [
      [A[1]*B[2]-B[1]*A[2]],
      [-(A[0]*B[2]-B[0]*A[2])],
      [A[0]*B[1]-B[0]*A[1]]
      ]
    return value;
}

function FindModuleVector(A)
{
    var N = A.length
    var sum = 0
    var value
    for (var i = 0; i < N; ++i)
    { 
      sum = sum + A[i] * A[i]
    }
    value = Math.sqrt(sum)
    return value;
}


function Determinant(A)   // Используется алгоритм Барейса, сложность O(n^3)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[ i ] = [];
       for (var j = 0; j < N; ++j) B[ i ][j] = A[ i ][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[ i ][ i ]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][ i ]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[ i ]; B[ i ] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[ i ][ i ];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][ i ];
          B[j][ i ] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[ i ][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}

function defenitionOfQuarterCircle(matrix_alfa_delta_R)
{
  let e = matrix_alfa_delta_R[0]
  let m = matrix_alfa_delta_R[1]
  let n = matrix_alfa_delta_R[2]


  let delta = Math.asin(n)
  let deltaCos = Math.cos(delta)


  let sigh_alfa_cos = (e/deltaCos)
  let sigh_alfa_sin = (m/deltaCos)

  if ((sigh_alfa_sin > 0) && (sigh_alfa_cos > 0))
  {
    return(0)
  } 

  if ((sigh_alfa_sin < 0) && (sigh_alfa_cos > 0))
  {
    return(2*Math.PI)
  } 

  if ((sigh_alfa_sin > 0) && (sigh_alfa_cos < 0))
  {
    return(Math.PI)
  }

  if ((sigh_alfa_sin < 0) && (sigh_alfa_cos < 0))
  {
     return(Math.PI)
  }  
}

function AdjugateMatrix(A)   // A - двумерный квадратный массив
{                                   
    var N = A.length, adjA = []
    for (var i = 0; i < N; i++)
     { adjA[ i ] = []
       for (var j = 0; j < N; j++)
        { var B = [], sign = ((i+j)%2==0) ? 1 : -1
          for (var m = 0; m < j; m++)
           { B[m] = []
             for (var n = 0; n < i; n++)   B[m][n] = A[m][n]
             for (var n = i+1; n < N; n++) B[m][n-1] = A[m][n]
           }
          for (var m = j+1; m < N; m++)
           { B[m-1] = []
             for (var n = 0; n < i; n++)   B[m-1][n] = A[m][n]
             for (var n = i+1; n < N; n++) B[m-1][n-1] = A[m][n]
           }
          adjA[ i ][j] = sign*Determinant(B)  // Функцию Determinant см. выше
        }
     }
    return adjA
}

function InverseMatrix(A)   // A - двумерный квадратный массив
{   
    let det = Determinant(A) 
    if (det == 0) return false
    let N = A.length
     A = AdjugateMatrix(A) // Функцию AdjugateMatrix см. выше
    for (var i = 0; i < N; i++)
     { for (var j = 0; j < N; j++) 
      {
      A[ i ][j] /= det
      }
      }
    return A
}



  
  
module.exports.MultiplyMatrix = MultiplyMatrix
module.exports.TransMatrix = TransMatrix
module.exports.MultiplyMatrixVector = MultiplyMatrixVector
module.exports.FindModuleVector = FindModuleVector
module.exports.defenitionOfQuarterCircle = defenitionOfQuarterCircle
module.exports.InverseMatrix = InverseMatrix