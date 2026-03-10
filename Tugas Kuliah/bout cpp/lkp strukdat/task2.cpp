#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <iostream> 
#include <vector>
using namespace std;

// Struktur Data
struct Mahasiswa
{
  char nama[50];
  int nim;
  float ipk;
};

// void cetakMahasiswa(Mahasiswa *ptr, int jumlah) {
//   printf("\nDAFTAR MAHASISWA\n");
//   for (int i = 0; i < jumlah; i++) {
//     printf("Mahasiwa ke-%d:\n", i + 1);
//     printf("Nama : %s\n", ptr->nama);
//     printf("NIM : %d\n", ptr->nim);
//     printf("IPK : %.2f\n", ptr->ipk);
//     printf("\n");
//     ptr++;
//   }
// }

int main()
{
//   //menggunakan struct
//   struct Mahasiswa listMhs[2];
  
//   // tambahkan data Mahasiswa
//   listMhs[0] = {"Jackson", 202590013, 3.25};
//   listMhs[1] = {"Chase", 202590017, 3.75};
  
//   cetakMahasiswa(listMhs, 2);

    vector<Mahasiswa> data_Mahasiswa;
    Mahasiswa mhs1;
    strcpy(mhs1.nama, "Jackson");
    mhs1.nim = 202590013;
    mhs1.ipk = 3.25;

    Mahasiswa mhs2;
    strcpy(mhs2.nama, "Chase");
    mhs2.nim = 202590017;
    mhs2.ipk = 3.75;

    Mahasiswa mhs3;
    strcpy(mhs3.nama, "Alex");
    mhs3.nim = 202590100;
    mhs3.ipk = 3.00;

    data_Mahasiswa.push_back(mhs1);
    data_Mahasiswa.push_back(mhs2);
    data_Mahasiswa.push_back(mhs3);

    for (int i = 0; i < data_Mahasiswa.size(); i++)
    {
        printf("%d.\tNama: %s\n", i+1, data_Mahasiswa[i].nama);
        printf("\tNIM: %d\n", data_Mahasiswa[i].nim);
        printf("\tIPK: %.2f\n", data_Mahasiswa[i].ipk);
    }
    

  
  return 0;
}



