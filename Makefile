
CC=gcc


bin/plotter: *.h *.c bin
	${CC} -Wall -Wextra -Wpedantic -fsanitize=null -o bin/plotter -O3 -g -std=c2x -DLINUX -lm -lGLEW -lGLU -lGL -lglfw -lpthread main.c

bin:
	mkdir bin

.PHONY: run
run: bin/plotter
	bin/plotter
	
