const b = Math.sqrt(3);
const a = 0;
const eps = 0.00001;
const exactResult = 1.22836969;
const middleRectangleH = 0.004;
const max_deriv = 3150.6;
const legendreRoot1 = 0;
const legendreRoot2 = -1*Math.sqrt(3/5);
const legendreRoot3 = Math.sqrt(3/5);

function task1() {
    console.log("\n")
    let N1 = 1;
    let N2 = 2;
    let h1 = b-a;
    let h2 = (b-a)/2;
    let Q1 = LeftRectangle(N1,h1)
    let Q2 = LeftRectangle(N2,h2)
    let R = (Q1 - Q2)/(1 -(h2/h1));
    let i = 1;
    while(Math.abs(R) > eps){
        i++;
        h1 = h2;
        h2 = h1 / 2;
        N2 = Math.pow(2, i);
        Q1 = Q2;
        Q2=LeftRectangle(N2,h2);
        R = (Q1 - Q2)/(1 -(h2/h1));
    }
    console.log("Шаг = "+h1);
    console.log("Результат = " + Q1);
}

function myFunc(x) {
    return x*Math.atan(x);
}

function LeftRectangle(segmentsCount, h){
    let summ = 0;
    for (let i = 1; i <= segmentsCount - 1; i++){
        summ += myFunc(a + i*h);
    }
    return h * summ;
}

//task1()

function middleRectangle(N){
    let sum = 0;
    for(let i = 0; i <= N - 1; i++){
        sum += myFunc(a + i*middleRectangleH + middleRectangleH/2)
    }
    return middleRectangleH*sum;
}

function task2() {
    console.log("\n");
    let N = b/middleRectangleH;
    let myResult = 0

    myResult = middleRectangle(N)

    console.log("Результат = " + myResult)
    console.log("N = " + N)
    console.log("r = " + (exactResult - myResult))
}

//task2()

function trapezeRule(N, h){
    let sum = 0;
    for(let i = 0; i <= N - 1; i++){
        sum += myFunc(h*i)
    }
    return h*((myFunc(a)+myFunc(b))/2 + sum);
}

function task3() {
    console.log("\n");
    let myResult = 0
    let h = 0.004;
    let N = b/h;
    myResult = trapezeRule(N, h)


    console.log("Результат = " + myResult)
    console.log("N = " + N)
    console.log("r = " + (exactResult - myResult))
}

//task3()

function getSummands(x) {
    let legendre = LegendreDerivative(x);
    let solution = (myFunc((a+b)/2 + x*(b-a)/2))/((1 - x*x)*legendre*legendre);
    return solution
}

function LegendreDerivative(x){
    return (3*(5*x*x-1)/2)
}

function error(){
    let sol1 = (max_deriv * 2*2*2*2*2*2*2*2*2)/(40320 * 9);
    let sol2 = ((24*24)/(40320*40320))*((24*24)/(40320*40320))
    return sol1 * sol2;
}

function task4(){
    let myResult = 0;
    let myError = 0;
    let val1 = getSummands(legendreRoot1);
    let val2 = getSummands(legendreRoot2);
    let val3 = getSummands(legendreRoot3);
    myResult = (b-a)*(val1 + val2 + val3);
    myError = error();
    console.log("Результат = " + myResult)
    console.log("Gauss r = " + (myError))
    console.log("r = " + (exactResult - myResult))
}
task4()
