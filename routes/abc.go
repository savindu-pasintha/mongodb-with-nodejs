package main

import "fmt"
func max(num1, num2 int) int {
	/* local variable declaration */
	var result int
 
	if (num1 > num2) {
	   result = num1
	} else {
	   result = num2
	}
	return result 
 }
func main() {
	var x float64
	var i int
	i = 1000
	x = 20.0
	fmt.Println(i * 75)
	fmt.Println(x)
	fmt.Printf("x is of type %T\n", x)
	fmt.Println("Hello, World! savindu pasintha")
	const LENGTH int = 10
	const WIDTH int = 5
	var area int

	area = LENGTH * WIDTH
	fmt.Printf("value of area : %d", area)

	if 7 > 2 {
		fmt.Printf("value of area : 1")
	}

	var a int = 100
   var b int = 200
   var ret int

   /* calling a function to get max value */
   ret = max(a, b)

   fmt.Printf( "Max value is : %d\n", ret )
}

//go run abc.go
