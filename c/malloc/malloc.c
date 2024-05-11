#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 1000000000; // Allocate space for 1 billion integers

    arr = (int*)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed.\n");
        return 1;
    }

    printf("%p\n", arr);
    // Use the allocated memory

    // Don't forget to free the allocated memory when you're done with it
    free(arr);

    return 0;
}