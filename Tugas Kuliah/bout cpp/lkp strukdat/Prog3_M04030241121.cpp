#include<stdio.h>
#include<stdlib.h>

int main(){

    int n,i;
    int *a, *b;
    scanf("%d", &n);

    a = (int *) malloc (n*sizeof(int));
    b = (int *) malloc (n*sizeof(int));

    for (int i = 0; i < n; i++)
    {
        *(a+i) = rand()%10;
        *(b+n-i-1) = *(a+i);
    }
    
    for (int i = 0; i <n; i++)
    {
        printf("%d ", *(a+i));
    }
    printf("\n");
    for (int i = 0; i <n; i++)
    {
        printf("%d ", *(b+i));
    }

    free(a);
    free(b);
    return 0;

}