#include<stdio.h>
#include<stdlib.h>

int main(){

    // deklarasi array dinamis
    int *dynamicArray = (int *)malloc(5*sizeof(int));

    // inisiasi elemen array
    for (int i = 0; i < 5; ++i)
    {
        dynamicArray[i] = i+1;
    }
    
    // Akses dan cetak array
    for (int i = 0; i < 5; ++i)
    {
        printf("%d", dynamicArray[i]);
    }
    printf("\n");
    // penambahan alokasi array di tengah program
    int newSize = 8;
    dynamicArray = (int *) realloc(dynamicArray, newSize * sizeof(int));

    // inisiasi elemen tambahan
    for (int i = 5; i < newSize; ++i)
    {
        dynamicArray[i] = i+1;
    }
    
    // Akses dan cetak array tambahan
    for (int i = 5; i < newSize; ++i)
    {
        printf("%d ", dynamicArray[i]);
    }
    
    // dealokasi array dinamis
    free(dynamicArray);
    return 0;

}