package week1;
import java.util.Scanner;
import java.io.FileInputStream;

class no1959
{
	public static void main(String args[]) throws Exception
	{
		//서로 마주보는 숫자들을 곱한 뒤 모두 더할 때 최댓값을 구하라.
		Scanner sc = new Scanner(System.in);
		int T;
		T=sc.nextInt();
		
		for(int test_case = 1; test_case <= T; test_case++)
		{	
			int sum = 0;
			int sumMax = 0;
			
			int n = sc.nextInt();
			int m = sc.nextInt();
			
			int arr_n[] = new int[n];
			int arr_m[] = new int[m];
			
			for(int i = 0; i < n; i++) {
				arr_n[i] = sc.nextInt();
			}
			for(int i = 0; i < m; i++) {
				arr_m[i] = sc.nextInt();
			}

			if(n < m) {
				for(int i = 0; i < m-n+1; i++) {		//0 1 2
					sum = 0;
					for(int j = i; j < n+i; j++) {		//0 -> 3, 1->4, 2->5
						sum += arr_n[j-i] * arr_m[j];
					}
					if(sum > sumMax) {
						sumMax = sum;
					}
				}
			}
			else {
				for(int i = 0; i < n-m+1; i++) {
					sum=0;
					for(int j = i; j <m+i; j++) {
						sum += arr_n[j] * arr_m[j-i];
					}
					if(sum > sumMax) {
						sumMax = sum;
					}
				}
			}
			
			System.out.printf("#%d %d\n", test_case, sumMax);
		}
	}
}