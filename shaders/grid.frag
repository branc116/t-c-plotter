// Applies sinc function to the user texture.
// Stolen from http://adrianboeing.blogspot.com/2011/02/ripple-effect-in-webgl.html
#version 330

precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
uniform sampler2D tex;
uniform float zoom;
uniform vec2 offset;

in vec2 uv;
in vec4 color;
out vec4 out_color;
float log10(float f) {
    return log(f) / log(10.0f);
}
float map(vec2 fragCoord, float zoom_level, vec2 offset) {
    float baseMinor = floor(log10(zoom_level * 4.5)) - 1.0f;
    float baseMajor = baseMinor + 1;
    float divs = pow(10, baseMinor);
    float divsMajor = pow(10, baseMajor);
    vec2 cPos = ( fragCoord - .5*resolution.xy ) / resolution.y;
    cPos *= zoom_level;
    cPos += offset;
    return smoothstep(mod(cPos.x, divs) - zoom_level * 0.004, 0.0, 0.50* zoom_level) +
        smoothstep(mod(cPos.y, divs) - zoom_level * 0.004, 0.0, .50* zoom_level) +
        smoothstep(mod(cPos.x, divsMajor) - zoom_level * 0.008, 0.0, 1009.50* zoom_level) +
        smoothstep(mod(cPos.y, divsMajor) - zoom_level * 0.008, 0.0, 1009.50* zoom_level);
}
void main(void) {
    vec2 fragCoord = gl_FragCoord.xy;
    float buff = 0.0;
    float AAx = 4.0, AAy = 4.0, AAz = 0.0;
    for (float x = -AAx; x <= AAx; ++x)
    for (float y = -AAy; y <= AAy; ++y)
    for (float t = -AAz; t <= AAz; ++t)
        buff += map(
            vec2(fragCoord) + vec2(x, y)/(vec2(AAx, AAy + 1.0)),
            zoom,
            offset
        );
    
    //float cLength = length(cPos);

    //vec2 tex_uv = uv + (cPos/cLength)*mix(cos(cLength*12.0-time*4.0)*1.03, 0.0, cLength / 0.25);
    float aaCount = (AAx*2.0 + 1.0) * (AAy * 2.0 + 1.0) * (AAz * 2.0 + 1.0);
    buff /= aaCount;
    out_color = vec4(buff, buff, buff, 1.0f) / 2.0 + texture(tex, uv);
    //out_color = vec4(sin(zoom));
}
