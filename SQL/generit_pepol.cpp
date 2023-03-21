#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define NUM_NAMES 100
#define NAME_LENGTH 10
#define NUM_IDS 100
#define ID_LENGTH 6
#define NUM_PASSWORDS 100
#define PASSWORD_LENGTH 8

// Generates a random name
void generate_random_name(char* name) {
    static const char charset[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    srand(time(NULL)); // Seed the random number generator
    for (int i = 0; i < NAME_LENGTH; i++) {
        int index = rand() % sizeof(charset);
        name[i] = charset[index];
    }
    name[NAME_LENGTH] = '\0'; // Add null terminator to the end of the string
}

// Generates a random id
void generate_random_id(char* id) {
    static const char charset[] = "0123456789";
    srand(time(NULL)); // Seed the random number generator
    for (int i = 0; i < ID_LENGTH; i++) {
        int index = rand() % sizeof(charset);
        id[i] = charset[index];
    }
    id[ID_LENGTH] = '\0'; // Add null terminator to the end of the string
}

// Generates a random password
void generate_random_password(char* password) {
    static const char charset[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    srand(time(NULL)); // Seed the random number generator
    for (int i = 0; i < PASSWORD_LENGTH; i++) {
        int index = rand() % sizeof(charset);
        password[i] = charset[index];
    }
    password[PASSWORD_LENGTH] = '\0'; // Add null terminator to the end of the string
}

// Example usage
int main() {
    // Generate random names
    char names[NUM_NAMES][NAME_LENGTH + 1];
    for (int i = 0; i < NUM_NAMES; i++) {
        generate_random_name(names[i]);
    }

    // Generate random ids
    char ids[NUM_IDS][ID_LENGTH + 1];
    for (int i = 0; i < NUM_IDS; i++) {
        generate_random_id(ids[i]);
    }

    // Generate random passwords
    char passwords[NUM_PASSWORDS][PASSWORD_LENGTH + 1];
    for (int i = 0; i < NUM_PASSWORDS; i++) {
        generate_random_password(passwords[i]);
    }

    // Print the generated data
    for (int i = 0; i < NUM_NAMES; i++) {
        printf("Name: %s\n", names[i]);
    }
    for (int i = 0; i < NUM_IDS; i++) {
        printf("ID: %s\n", ids[i]);
    }
    for (int i = 0; i < NUM_PASSWORDS; i++) {
        printf("Password: %s\n", passwords[i]);
    }

    return 0;
}
