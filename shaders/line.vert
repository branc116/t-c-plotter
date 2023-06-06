#version 330

precision mediump float;

layout(location = 3) in vec2 pos;

uniform vec2 offset;
uniform vec2 resolution;
uniform vec2 zoom;
out vec2 uv;

void main(void)
{
    vec2 fact = resolution.xy / resolution.yy;
    uv = pos;
    uv -= offset;
    uv /= fact;
    uv /= zoom;
    uv *= 2.0;
    gl_Position = vec4(uv, 0.0, 1.0);// vec4(uv, 0.0, 1.0);
}
