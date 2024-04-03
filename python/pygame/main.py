import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Set up the screen
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Simple Game")

# Set up colors
WHITE = (255, 255, 255)
RED = (255, 0, 0)
BLACK = (0, 0, 0)

# Set up player
player_size = 50
player_x = WIDTH // 2 - player_size // 2
player_y = HEIGHT - player_size - 10
player_speed = 5
player_rect = pygame.Rect(player_x, player_y, player_size, player_size)

# Set up enemy
enemy_size = 50
enemy_x = random.randint(0, WIDTH - enemy_size)
enemy_y = 10
enemy_speed = 3
enemy_rect = pygame.Rect(enemy_x, enemy_y, enemy_size, enemy_size)

# Function to display text on screen
def display_text(text, font, color, x, y):
    text_surface = font.render(text, True, color)
    text_rect = text_surface.get_rect()
    text_rect.center = (x, y)
    screen.blit(text_surface, text_rect)

# Main game loop
running = True
game_over = False
while running:
    while not game_over:
        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
                game_over = True
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_q:
                    running = False
                    game_over = True
                if event.key == pygame.K_r:
                    # Reset game variables
                    player_rect.x = WIDTH // 2 - player_size // 2
                    player_rect.y = HEIGHT - player_size - 10
                    enemy_rect.x = random.randint(0, WIDTH - enemy_size)
                    enemy_rect.y = 10
                    enemy_speed = 3
                    game_over = False

        # Move player
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT] and player_rect.x > 0:
            player_rect.x -= player_speed
        if keys[pygame.K_RIGHT] and player_rect.x < WIDTH - player_size:
            player_rect.x += player_speed

        # Move enemy
        enemy_rect.y += enemy_speed
        if enemy_rect.y > HEIGHT:
            enemy_rect.x = random.randint(player_rect.x - 50, player_rect.x + 50)
            enemy_rect.y = -50
            if enemy_speed < 10:
                enemy_speed += 0.5

        # Check for collision
        if player_rect.colliderect(enemy_rect):
            game_over = True

        # Clear the screen
        screen.fill(WHITE)

        # Draw player and enemy
        pygame.draw.rect(screen, RED, player_rect)
        pygame.draw.rect(screen, RED, enemy_rect)

        # Update the display
        pygame.display.flip()

        # Cap the frame rate
        pygame.time.Clock().tick(180)

    # Game over screen
    while game_over:
        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
                game_over = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_q:
                    running = False
                    game_over = False
                if event.key == pygame.K_r:
                    # Reset game variables
                    player_rect.x = WIDTH // 2 - player_size // 2
                    player_rect.y = HEIGHT - player_size - 10
                    enemy_rect.x = random.randint(0, WIDTH - enemy_size)
                    enemy_rect.y = 10
                    enemy_speed = 3
                    game_over = False

        # Game over screen
        screen.fill(BLACK)
        display_text("Game Over", pygame.font.Font(None, 64), RED, WIDTH // 2, HEIGHT // 2 - 50)
        display_text("Press 'Q' to Quit", pygame.font.Font(None, 36), WHITE, WIDTH // 2, HEIGHT // 2 + 20)
        display_text("Press 'R' to Retry", pygame.font.Font(None, 36), WHITE, WIDTH // 2, HEIGHT // 2 + 70)
        pygame.display.flip()

# Quit Pygame
pygame.quit()
sys.exit()
