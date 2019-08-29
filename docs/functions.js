
function ar_to_xy(angle, radius) {
    x = radius * Math.sin(Math.PI * 2 * angle / 360);
    y = radius * Math.cos(Math.PI * 2 * angle / 360);
    return {'x': x, 'y': y}
};

function votes_to_circles(votes) {
    if(votes <= 258147) {
        return 3;
    } else if(votes <= 470434) {
        return 4;
    } else if(votes <= 726970) {
        return 5;
    } else {
        return 6;
    }
}

function score_to_scale(score, radius) {
    if(score <= 6.50) { 
        return radius * 0.30;
    } else if(score <= 7.2) {
        return radius * 0.55;
    } else if(score <= 8.30) {
        return radius * 0.80;
    } else {
        return radius;
    }
}

function draw_circles(mst, x, y, N, radius, title, release, sz="8.5px") { 
    let initial = 360 / N;
    let positions = Array.from({length: N}, (v, k) => ar_to_xy(k * initial, radius));

    let tag = mst.append('g');
    positions.forEach( (pos) => {
        tag.append('g')
            .attr("transform", "translate(" + x + "," + y + ")")
            .append('circle')
                .attr('cx', pos.x)
                .attr('cy', pos.y)
                .attr('r', radius)
                .style("stroke", "dimgray")
                .style("fill", "none");
    });

    tag.append('circle')
         .attr('cx', x)
         .attr('cy', y)
         .attr('r', radius)
         .style("stroke", "dimgray")
         .style("fill", "none"); 

    mst.append('text')
        .attr("x", x)
        .attr("y", y + 50)
        //.attr("font-family", "Helvetica Neue")
        .attr("font-family", "Share Tech Mono")
        .attr("font-size", sz)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text(title);

    if( release != '') {
        mst.append('text')
            .attr("x", x)
            .attr("y", y + 65)
            //.attr("font-family", "Helvetica Neue")
            .attr("font-family", "Share Tech Mono")
            .attr("font-size", sz)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .text('(' + release + ')');
    }
}

function draw_shadow(mst, x, y, radius, colors) {
    /*if (color.length < 3) {
        colors = colors.concat(Array(3 - colors.length).fill(colors[colors.length - 1]));
    }*/
    let radius_for_center = 2 * radius / 3;
    let radius_for_shadorw = radius * 1.45;
    let initial = 360 / colors.length;
    let positions = Array.from({length: colors.length}, (v, k) => {
        let pos = ar_to_xy(180 + k * initial, radius_for_center);
        pos.color = colors[k];
        return pos;
    });

    let tag = mst.append('g');
    positions.forEach( (pos) => {
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
            return 'orange';
            break;
        case 'Action/Adventure':
            return 'orange';
            break;
        case 'Romance':
            return 'pink';
            break;
        case 'Comedy':
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
        case 'Crime':
            return 'grey';
            break;
        case 'Crime/Thriller':
            return 'grey';
            break;
        case 'Music':
            return 'yellow';
            break;
        default:
            return 'black';
    }
};

function draw_line(mst, x, y, N, length = 50) {
    let tag = mst.append('g');
    tag.append('g')
        .attr("transform", "translate(" + x + "," + y + ")")
        .append('line')
            .attr('x1', 0)
            .attr('x2', length)
            .attr('y1', 0)
            .attr('y2', 0)
            .style("stroke", "dimgray")
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

    py += 50;
    saga.data.forEach( (movie, idx, array) => {
        let clr = movie.category.map(category_to_color).filter((color) => 'black');
        draw_shadow(svg, px, py, score_to_scale(movie.score, 15), color = clr);
        draw_circles(svg, px, py, votes_to_circles(movie.votes), score_to_scale(movie.score, 15), movie.title, movie.release);
        if (idx < array.length - 1) { 
            draw_line(svg, px + 40, py, 1, gap - 30 - 50);
        }
        px += gap;
    });
}

function draw_legend(px, py) {
    let cat = ['Music', 'Action/Adventure', 'Romance', 'Comedy', 'Fantasy', 'Drama', 'Sci-Fi', 'Crime/Thriller'];
    let votes = [{'n': 3, 'caption': 'votes < 2.6k'}, {'n': 4, 'caption': '2.6k < votes < 4.7k'}, 
        {'n': 5, 'caption': '4.7k < votes < 7.2k'}, {'n': 6, 'caption': 'votes > 7.2k'}];
    let scores = [{'factor': 0.40, 'caption': 'score < 6.5'}, {'factor': 0.55, 'caption': '6.5 < score < 7.2'}, 
        {'factor': 0.80, 'caption': '7.2 < score < 8.3'}, {'factor': 1, 'caption': 'score > 8.3'}];
    let cat_tag = leg.append('g');
    let x = px;
    let y = py;
    cat.forEach( (cat, idx, array) => {
        clr = category_to_color(cat);
        cat_tag.append('g')
            .append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 20)
                .style("stroke", "none")
                .style("fill", clr)
                .attr('class','class-of-elements')
                .style("fill-opacity", .2);
        
        leg.append('text')
            .attr("x", x)
            .attr("y", y + 40)
            .attr("font-family", "Share Tech Mono")
            .attr("font-size", "10px")
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .text(cat);

        x += 65;
    });

    x = px + px / 2;
    y += 100;
    votes.forEach( (vote, idx, array) => {
        draw_circles(leg, x, y, vote.n, 15, vote.caption, '', sz="10px");
        x += 65 * 2;
    });

    x = px + px / 2;
    y += 100;
    scores.forEach( (score, idx, array) => {
        draw_circles(leg, x, y, 3, score.factor * 15, '', score.caption, sz="10px");
        x += 65 * 2;
    });
}




