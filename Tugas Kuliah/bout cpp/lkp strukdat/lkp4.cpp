1a.#include <bits/stdc++.h>
using namespace std;


struct Node {
    int data;
    Node* next;
};


// Allocates a new node with given data
Node *newNode(int data)
{
    Node *new_node = new Node;
   
    new_node->data = data;
    new_node->next = NULL;
   
    return new_node;
}




// Function to insert a new node at the
// end of linked list using recursion.
Node* insertEnd(Node* head, int data)
{
    // If linked list is empty, create a
    // new node (Assuming newNode() allocates
    // a new node with given data)
    if (head == NULL)
        return newNode(data);


    // If we have not reached end, keep traversing
    // recursively.
    else
        head->next = insertEnd(head->next, data);


    return head;
}


// buatan sapik
void insertEnd2(Node* &head, int data)
{
    // kalau linked list kosong
    if (head == NULL)
        head = newNode(data);
   
    // kalau head merujuk ke node terakhir
    else if (head->next == NULL)
        head->next = newNode(data);


    // geser ke node berikutnya
    else
        insertEnd2(head->next, data);


    return;
}


void traverse(Node* head)
{
    if (head == NULL)
        return;
    cout << head->data << " ";


    traverse(head->next);
}


void insertAfterKey(Node *p, int key, int data){
    if(p == NULL){
        return;
    }


    if(p->data == key){
        Node* temp= newNode(data);
        temp->next=p->next;
        p->next= temp;
        return;
    }


    if(p -> next == NULL){
        p->next = newNode(data);
        return;
    }


    insertAfterKey(p->next, key, data);
}






int main()
{
    Node* head = NULL;


    head = insertEnd(head, 6);
    head = insertEnd(head, 8);
    head = insertEnd(head, 10);
    head = insertEnd(head, 12);
    head = insertEnd(head, 14);
    traverse(head);
    insertAfterKey(head, 12, 13);
    insertAfterKey(head, 8, 9);
    insertAfterKey(head, 15, 16);
    cout << "\n";
    traverse(head);
    return 0;
}

void deleteKey(Node* prev, Node* p, int key) {
    if (p == NULL) {
        return;
    }
    if (p->data == key) {
        if (prev != p) {
            prev->next = p->next;
            delete p;
        }
        return;
    }
    deleteKey(p, p->next, key);
}

2.
3

