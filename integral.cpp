#include <iostream>
#include <math.h>
#include <vector>

using namespace std;

double function1(const double& x) {
    return ((1+pow(x,2))/(1+pow(x,3)));
}

double function2(const double& x, const double& y) {
    return (pow(x, 2) + 2 * y);
}

double get_func(double x) {
	return ((1+pow(x,2))/(1+pow(x,3)));
}

double get_integral_by_trapezoid(double (*get_func)(double), double a, double b, double eps, double& Error) {// интегралл по трапеции
    double n = 1;
    short p = 2;
    double h = (b - a) / n;

    double I = 1;
    double I_previous = 0;

    while (abs(I - I_previous) >= 3 * eps) {// цикл подсчета интеграла с определенной точностью esp
        I_previous = I;

        double sum = 0;
        for (int i = 1; i < n; ++i) {
            sum += 2 * get_func(i * h + a);
        }

        I = ((sum + get_func(a) + get_func(b)) * h / 2);
        Error = abs((I_previous - I) / (pow(0.5, p) - 1));// погрешность

        n *= 2;
        h /= 2;
    }
    cout << "step: " << h << endl;
    cout << "steps count: " << n << endl;

    return I;
}

double get_integral_by_Simpson(double (*get_func)(double), double a, double b, double eps, double& Error) {
    double n = 1;
    short p = 4;
    double h = (b - a) / n;

    double I = 1;
    double I_previous = 0.0;

    while (abs(I - I_previous) >= 15 * eps) {
        I_previous = I;
        double sum = 0;
        for (int i = 1; i < n; ++i) {
            sum += i % 2 == 0 ? 2 * get_func(i * h + a) : 4 * get_func(i * h + a);
        }

        I = ((sum + get_func(a) + get_func(b)) * h / 3);
        Error = abs((I_previous - I) / (pow(0.5, p) - 1));
        n *= 2;
        h /= 2;
    }
    //cout << "I_previous - I: " << abs(I - I_previous) << endl;
    cout << "step: " << h << endl;
    cout << "steps count: " << n << endl;

    return I;
}

double get_integral_for_cube(const vector<double>& x, const vector<double>& y, int n, int m, double step1, double step2){
    double integral = 0;

    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            integral += 
                function2(x.at(2 * i), y.at(2 * j)) + 
                function2(x.at(2 * i + 2), y.at(2 * j)) +
                function2(x.at(2 * i + 2), y.at(2 * j + 2)) +
                function2(x.at(2 * i), y.at(2 * j + 2)) +
                4 * (function2(x.at(2 * i + 1), y.at(2 * j)) +
                    function2(x.at(2 * i + 2), y.at(2 * j + 1)) +
                     function2(x.at(2 * i + 1), y.at(2 * j + 2)) +
                     function2(x.at(2 * i), y.at(2 * j + 1))) +
                16 * function2(x.at(2 * i + 1), y.at(2 * j + 1));
        }
    }
    integral *= step1 * step2 / 9;

    return integral;
}

double get_integral_by_cube_Simpson(const vector<double>& first_span, const vector<double>& second_span, const double& eps) {
    int n = 4, m = n;

    double step1 = (first_span.at(1) - first_span.at(0)) / (2 * n), 
           step2 = (second_span.at(1) - second_span.at(0)) / (2 * m);
    
    double integral = 0, integral2;

    vector<double> x = { first_span.at(0) };
    vector<double> y = { second_span.at(0) };

    for (int i = 1; i <= 2 * (n + 2); ++i) {
        x.push_back(first_span.at(0) + i * step1);
        y.push_back(second_span.at(0) + i * step2);
    }

    integral = get_integral_for_cube(x, y, n,m, step1, step2);

    // do {
    //     n *= 2;
    //     step1 = (first_span.at(1) - first_span.at(0)) / (2 * n);
    //     step2 = (second_span.at(1) - second_span.at(0)) / (2 * m);
    //     integral2 = integral;
    //     integral = 0;
    //     vector<double> x = { first_span.at(0) };
    //     vector<double> y = { second_span.at(0) };

    //     for (int i = 1; i <= 2 * (n + 2); ++i) {
    //         x.push_back(first_span.at(0) + i * step1);
    //         y.push_back(second_span.at(0) + i * step2);
    //     }

    //     integral = get_integral_for_cube(x, y, n,m, step1, step2);

    // } while (abs(integral - integral2) > 8 * eps);

    return integral;
}

int main() {
    int a = 0;// границы
    int b = 2;
    int n = 6;// степень полинома лежандра

	double eps = 1e-5;// точность
	double Error = 0.0;// погрешность

	// double I1 = get_integral_by_trapezoid(get_func, a, b, eps, Error);
	// cout << "\nBy trapezoid I= " << I1 << " +- " << Error << endl;

    // double I2 = get_integral_by_Simpson(get_func, a, b, eps, Error);
	// cout << "\nBy Simpson I= " << I2 << " +- " << Error << endl;

    
    vector<double> first_span_1 = { 0, 2.0 };
    vector<double> second_span_1 = { 0, 1.0 };

    double I3 = get_integral_by_cube_Simpson(first_span_1, second_span_1, eps);
    cout << "\nCube integral by Simpson I= " << I3 << endl;
	return 0;
}