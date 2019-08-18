
function ar_to_xy(angle, radius) {
    x = radius * Math.sin(Math.PI * 2 * angle / 360);
    y = radius * Math.cos(Math.PI * 2 * angle / 360);
    return {'x': x, 'y': y}
};

function draw_circles(x, y, N, radius, text) { 
    var initial = 360 / N;
    var positions = Array.from({length: N}, (v, k) => ar_to_xy(k * initial, radius));

    var tag = svg.append('g');
    positions.forEach( pos => {
        tag.append('g')
            .attr("transform", "translate(" + x + "," + y + ")")
            .append('circle')
                .attr('cx', pos.x)
                .attr('cy', pos.y)
                .attr('r', radius)
                .style("stroke", "black")
                .style("fill", "none"); 
    });

    tag.append('circle')
         .attr('cx', x)
         .attr('cy', y)
         .attr('r', radius)
         .style("stroke", "black")
         .style("fill", "none"); 

    svg.append('text')
        .attr("x", x)
        .attr("y", y + 50)
        .attr("font-family", "Helvetica Neue")
        .attr("font-size", "8px")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text(text);
}

function draw_shadow(x, y, radius, colors) {
    if (color.length < 4) {
        colors = colors.concat(Array(4 - colors.length).fill(colors[colors.length - 1]));
    }
    radius = 2 * radius / 3;
    var initial = 360 / colors.length;
    var positions = Array.from({length: colors.length}, (v, k) => {
        var pos = ar_to_xy(180 + k * initial, radius);
        pos.color = colors[k];
        return pos;
    });
    
    var tag = svg.append('g');
    positions.forEach( pos => {
        tag.append('g')
            .attr("transform", "translate(" + x + "," + y + ")")
            .append('circle')
                .attr('cx', pos.x)
                .attr('cy', pos.y)
                .attr('r', radius)
                .style("stroke", "none")
                .style("fill", pos.color)
                .attr('class','class-of-elements')
                .style("fill-opacity", .2);
    })

};

function category_to_color(category) {
    switch(category) {
        case 'Action':
            return 'orange';
            break;
        case 'Adventure':
            return 'yellow';
            break;
        case 'Comedy':
            return 'pink';
            break;
        case 'Crime':
            return 'red';
            break;
        case 'Drama':
            return 'blue';
            break;
        case 'Fantasy':
            return 'purple';
            break;
        case 'Sci-Fi':
            return 'green'
            break;
        case 'Thriller':
            return 'grey';
            break;
        default:
            return 'black';
    }
};

function draw_line(x, y, N) {
    var tag = svg.append('g');
    tag.append('g')
        .attr("transform", "translate(" + x + "," + y + ")")
        .append('line')
            .attr('x1', 0)
            .attr('x2', 20)
            .attr('y1', 0)
            .attr('y2', 0)
            .style("stroke", "black")
            .style("stroke-width", "1");
}


function draw_saga(saga) {

}






