
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
        //.attr("font-family", "Helvetica Neue")
        .attr("font-family", "Share Tech Mono")
        .attr("font-size", "8.5px")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text(text);
}

function draw_shadow(x, y, radius, colors) {
    if (color.length < 3) {
        colors = colors.concat(Array(3 - colors.length).fill(colors[colors.length - 1]));
    }
    var radius_for_center = 2 * radius / 3;
    var radius_for_shadorw = radius * 1.45;
    var initial = 360 / colors.length;
    var positions = Array.from({length: colors.length}, (v, k) => {
        var pos = ar_to_xy(180 + k * initial, radius_for_center);
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
                .attr('r', radius_for_shadorw)
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

function draw_line(x, y, N, length = 50) {
    var tag = svg.append('g');
    tag.append('g')
        .attr("transform", "translate(" + x + "," + y + ")")
        .append('line')
            .attr('x1', 0)
            .attr('x2', length)
            .attr('y1', 0)
            .attr('y2', 0)
            .style("stroke", "black")
            .style("stroke-width", "1");
}


function draw_saga(saga, px, py, gap = 105) {

    svg.append('text')
        .attr("x", px / 2)
        .attr("y", py)
        .attr("font-family", "Share Tech Mono")
        .attr("font-size", "17px")
        .attr("text-anchor", "left")
        .attr("fill", "black")
        .text(saga.name);

    //px += 100;
    py += 50;
    saga.data.forEach( (movie, idx, array) => {
        console.log(px + ' / ' + movie.title);
        var clr = movie.category.map(category_to_color).filter((color) => 'black');
        console.log(clr);
        draw_shadow(px, py, 15, color = clr);
        draw_circles(px, py, 5, 15, movie.title);
        if (idx < array.length - 1) { 
            draw_line(px + 40, py, 1, gap - 30 - 50);
        }
        px += gap;
    });
}

function draw_legend(px, py) {
    cat = ['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Sci-Fi', 'Thriller'];
    var cat_tag = leg.append('g');
    x = px;
    cat.forEach( (cat) => {
        clr = category_to_color(cat);
        cat_tag.append('g')
            //.attr("transform", "translate(" + x + "," + y + ")")
            .append('circle')
                .attr('cx', x)
                .attr('cy', py)
                .attr('r', 20)
                .style("stroke", "none")
                .style("fill", clr)
                .attr('class','class-of-elements')
                .style("fill-opacity", .2);

        leg.append('text')
            .attr("x", x)
            .attr("y", py + 40)
            .attr("font-family", "Share Tech Mono")
            .attr("font-size", "13px")
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .text(cat);

        x += 75;
    });
}




