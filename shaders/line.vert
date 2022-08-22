// Single triangle strip quad generated entirely on the vertex shader.
// Simply do glDrawArrays(GL_TRIANGLE_STRIP, 0, 4) and the shader
// generates 4 points from gl_VertexID. No Vertex Attributes are
// required.
#version 330

precision mediump float;

layout(location = 3) in vec2 pos;

uniform vec2 offset;
uniform vec2 resolution;
uniform float zoom;
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
