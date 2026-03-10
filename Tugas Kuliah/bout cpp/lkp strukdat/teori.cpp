// ============== Bahasa C++ ==============
// #include <cstdlib>
// #include <iostream>
// using namespace std;

// int main(){
//     int x, y;
//     cout << "Masukkanlah dua buah angka yang akan dijumlahkan:" << "\n"; // printf("masukkanlah ... \n") 
//     cin >> x >> y; //Menerima input dari pengguna // scanf("%d %d", x, y)
//     int sum = x + y; //Operasi penjumlahan
 
//     //Mencetak hasil penjumlahan
//     cout << "Jumlah kedua bilangan tersebut ialah: " << sum << 
//     endl;

//     return EXIT_SUCCESS; //Program berakhir dengan sukses
// }

// ============== Pointer ==============
// #include <cstdlib>
// #include <iostream>
// using namespace std;

// int main(){
//     char ch = 'A';
//     char *p = &ch;
//     cout << "ch: "<< ch << endl;
//     cout << "*p: "<< *p << endl;
//     ch = 'q';
//     cout << "*p: "<< *p << endl;
//     *p = 'w';
//     cout << "ch: "<< ch << endl;
//     cout << "*p: "<< *p << endl;
//     ch = '1';
//     *p = '2';
//     cout << *p << endl;
//     cout << ch << endl;
// }

// ============== Struct ==============
// #include <string>
// #include <string.h>
// struct siswa{
//  int no_induk ;
//  std::string nama;
//  float nilai ;
// };
// siswa budi;

// int main(){
//     budi.no_induk = 62;
//     budi.nama = "budi";
//     budi.nilai = 7.89;
//     printf("%d", budi.no_induk);
//     printf(budi.nama.c_str());
//     printf("%.2f", budi.nilai);
// }


// ============== Container: Vector ==============
// #include <iostream>
// #include <vector>
// using namespace std;

// int main() {
//     vector<int> data;
    
//     data.push_back(10);
//     data.push_back(20);
//     data.push_back(30);
    
//     for(int i = 0; i < data.size(); i++) {
//     cout << data[i] << " ";
//     }

//     return 0;
// }


// ============== Container: Map ==============
// #include <iostream>
// #include <map>
// using namespace std;
// int main() {
//     map<string, int> nilai;
//     nilai["Ani"] = 85;
//     nilai["Budi"] = 90;
//     for(auto it = nilai.begin(); it != nilai.end(); it++) {
//     cout << it->first << " : " << it->second << endl;
//     }
//     return 0;
// }


// ============== Iterator ==============
// #include <iostream>
// #include <vector>
// using namespace std;

// int main() {
//     vector<int> data = {5, 10, 15};
    
//     for(vector<int>::iterator it = data.begin(); it != data.end(); it++) {
//     cout << *it << " ";
//     }
    
//     return 0;
// }


// // ============== Algorithm ==============
// #include <iostream>
// #include <vector>
// #include <algorithm>
// using namespace std;

// int main() {
//     vector<int> data = {30, 10, 10, 20, 67, 99};
    
//     // sort: urutin ascending
//     sort(data.begin(), data.end());
//     // begin = elemen pertama, end = setelah elemen terakhir

//     for(int x : data) {
//     cout << x << " ";
//     }
//     cout << endl;


//     // find: cari elemen
//     int cari = 67;
//     vector<int>::iterator posisi = find(data.begin(), data.end(), cari);
//     if (posisi != data.end())
//     {
//         // kalau ketemu
//         cout << "Ketemu elemen bernilai " << cari << " di data" << endl;
//     } else
//     {
//         // kalau gak ketemu
//         cout << "Gak ketemu elemen bernilai " << cari << " di data" << endl;
//     }
    
    
//     // count: jumlah elemen bernilai sekian
//     int hitung = 67;
//     int jumlah = count(data.begin(), data.end(), hitung);
//     cout << "Ada " << jumlah << " elemen bernilai " << hitung << " di data" << endl;

//     // reverse: putar urutan
//     reverse(data.begin(), data.end());

//     for(int x : data) {
//     cout << x << " ";
//     }
//     cout << endl;

//     // max_element: nilai terbesar
//     vector<int>::iterator max = max_element(data.begin(), data.end());
//     cout << "elemen dengan nilai terbesar di data adalah " << *max << endl;

//     return 0;
// }

// ============== File ==============
// #include <iostream>
// #include <fstream>
// #include <string>
// using namespace std;

// int main() {
//     // 1. Membuat file
//     ofstream file("contoh.txt");
//     if (file.is_open()) {
//         cout << "File berhasil dibuat.\n";
//         file.close();
//     } else {
//         cout << "Gagal membuat file.\n";
//     }

//     // 2. Menulis ke file
//     file.open("contoh.txt", ios::out);
//     if (file.is_open()) {
//         file << "Ini adalah baris pertama.\n";
//         file << "Ini adalah baris kedua.\n";
//         cout << "Data berhasil ditulis ke file.\n";
//         file.close();
//     } else {
//         cout << "Gagal membuka file untuk menulis.\n";
//     }

//     // 3. Membaca file
//     ifstream readFile("contoh.txt");
//     if (readFile.is_open()) {
//         string line;

//         cout << "Isi file:\n";
//         while (getline(readFile, line)) {
//             cout << line << endl;
//         }

//         readFile.close();
//     } else {
//         cout << "Gagal membuka file untuk membaca.\n";
//     }

//     return 0;
// }