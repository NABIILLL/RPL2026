#include <iostream>
#include <cstdint>
using namespace std;
struct Node {
   int data;
   Node* next;
};








void insertAtBeginning(Node*& head, int newData) {
    Node* newNode = new Node;
    newNode->data = newData;
    newNode->next = head;
    head = newNode;
}








void insertAtEnd(Node*& head, int newData) {
    Node* newNode = new Node;
    newNode->data = newData;
    newNode->next = nullptr;
   
    if (head == nullptr) {
        head = newNode;
        return;
    }








    Node* last = head;
    while (last->next != nullptr) {
        last = last->next;
    }








    last->next = newNode;
}








void deleteAtBeginning(Node*& head) {
    if (head == nullptr) {
        std::cout << "Linked list is empty. Cannot delete from the beginning." <<
        std::endl;
        return;
    }








    Node* temp = head;
    head = head->next;








    delete temp;
}








void deleteAtEnd(Node*& head) {
    if (head == nullptr) {
        std::cout << "Linked list is empty. Cannot delete from the end." <<
        std::endl;
        return;
    }








    if (head->next == nullptr) {
        delete head;
        head = nullptr;
        return;
    }
   
    Node* secondLast = head;
    while (secondLast->next->next != nullptr) {
        secondLast = secondLast->next;
    }








    delete secondLast->next;
    secondLast->next = nullptr;
}








void updateData(Node* head, int oldData, int newData) {
    Node* current = head;  
   
    while (current != nullptr) {
        if (current->data == oldData) {
            current->data = newData;
            std::cout << "Data updated successfully." << std::endl;
            return;
        }








        current = current->next;
    }








    std::cout << "Data not found in the linked list." << std::endl;
}
















void printLinkedList(Node* head) {
    Node* current = head;








    while (current != nullptr) {
        // std::cout << current->data << " " <<  reinterpret_cast<uintptr_t>(current) << std::endl;
        std::cout << current->data << " ";
        current = current->next;
    }








    std::cout << std::endl;
}








// case 7
int countAll(Node* head){
    int count = 0;
    Node* current = head;








    while(current != nullptr){
        count++;
        current = current -> next;
    }








    return count;
}








void deleteLinkedList(Node*& head) {
    while (head != nullptr) {
        Node* temp = head;
        head = head->next;
        delete temp;
    }
}
void insertAs4(Node*& head, int newData) {
    if(countAll(head) < 3) {
        std:: cout << "kondisi tidak memenuhi" << std::endl;
        return;
    }
    Node* newNode = new Node;
    newNode->data = newData;




    Node* current = head;
    for( int i = 1; i < 3; i++){
        current = current->next;
    }
    newNode->next = current->next;
    current->next = newNode;
    std ::cout << "Data berhasil disisipkan pada urutan ke-4" << std::endl;
}


void cetak_genap(Node* head) {
    Node* current = head;


    while (current != nullptr) {
        if (current->data % 2 == 0) {
            std::cout << current->data << " ";
        }
        current = current->next;
    }


    std::cout << std::endl;
}

//case 10
void delbefore2end(Node*& head){
    int count = countAll(head);

    if(count < 3){
        cout<< " Node kurang dari 3, gak bisa dihapus."<<endl;
    }

    if (count == 3)
    {
        deleteAtBeginning(head);
        return;
    }

    Node* current = head;
    for (int i = 1; i < count-3; i++)
    {
        current = current->next;
    }
    
    Node* temp = current->next;
    current->next = temp->next;
    delete temp;
}

int main() {
    Node* head = nullptr;
    int choice;
    do {
        std::cout << "\nMenu:\n1. Insert di Awal\n2. Insert di Akhir\n3. Hapus di Awal\n4. Hapus di Akhir\n5. Update Data\n6. Cetak Linked List\n7. Hitung Jumlah Node\n8. Insert data urutan 4\n9. Cetak Bilangan Genap\n10. Hapus sebelum dua node terakhir\n0. Keluar\n";
        std::cout << "Pilih operasi (0-9): ";
        std::cin >> choice;


        switch (choice) {
            case 1:
                int insertData;
                std::cout << "Masukkan data untuk di-insert di awal: ";
                std::cin >> insertData;
                insertAtBeginning(head, insertData);
                break;


            case 2:
                int insertDataEnd;
                std::cout << "Masukkan data untuk di-insert di akhir: ";
                std::cin >> insertDataEnd;
                insertAtEnd(head, insertDataEnd);
                break;


            case 3:
                deleteAtBeginning(head);
                break;


            case 4:
                deleteAtEnd(head);
                break;


            case 5:
                int oldData, newData;
                std::cout << "Masukkan data yang ingin di-update: ";
                std::cin >> oldData;
                std::cout << "Masukkan nilai baru: ";
                std::cin >> newData;
                updateData(head, oldData, newData);
                break;


            case 6:
                printLinkedList(head);
                break;


            case 7:
            cout << "Jumlah seluruh node dalam Linked List : " << countAll(head) << endl;
            break;




            case 8:
                int data;
                std::cout << "data urutan ke- 4 : ";
                std::cin >> data;
                insertAs4(head, data);
                break;


            case 9:
                cetak_genap(head);
                break;

            case 10:
                delbefore2end(head);
                break;
           
            case 0:
                std::cout << "Keluar dari program.\n";
                break;


            default:
                std::cout << "Pilihan tidak valid. Coba lagi.\n";
                break;
        }
    } while (choice != 0);
   
    // Hapus seluruh linked list sebelum keluar dari program
    deleteLinkedList(head);
    return 0;
}



















