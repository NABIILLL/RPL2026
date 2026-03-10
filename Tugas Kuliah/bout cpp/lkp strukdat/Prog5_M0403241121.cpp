#include <iostream>
#include <vector>
using namespace std;

vector<int> getValues(){
  vector<int> v;
  for(int i = 0; i<10; i++){
    v.push_back(i+1);
  }
  return v;
}

int main(){
  
  vector<int> get;
  get = getValues();
  
  // Menggunakan iterator untuk mengakses elemen vector
  vector<int>::iterator it;
  for(it = get.begin(); it != get.end(); ++it){
    cout<< *it << " ";
  }
  cout<<endl;

  get.clear();
  cout<< get.size();

  return 0;
}
