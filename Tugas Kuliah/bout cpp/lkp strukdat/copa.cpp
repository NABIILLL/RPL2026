#include<cstdlib> //kalo mau pake c <cstdio>
#include<iostream>
using namespace std;

int main(){

    int x,y;
    cout<<"Masukkan dua buah angka yang akan dijumlahkan: "<<endl;
    cin>>x>>y;
    int sum = x+y;

    cout<<"Jumlah kedua bilangan adalah : "<<sum<<endl;
    return EXIT_SUCCESS;

}