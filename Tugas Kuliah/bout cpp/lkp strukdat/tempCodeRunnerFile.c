
void init(Stack *s);
int is_empty(Stack *s);
int is_full(Stack *s);
int push(Stack *s, int x);
int pop(Stack *s, int *value);
int stack_top(Stack *s, int *value);

int main(void)
{
    Stack s;
    int choice, value;
    char ch;

    init(&s);

    do {
        printf("\n===== STACK MENU =====\n");
        printf("1. Push\n");
        printf("2. Pop\n");