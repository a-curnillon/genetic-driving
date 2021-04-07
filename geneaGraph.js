export default function define(runtime, observer) {
    const main = runtime.module();
    main.variable(observer("chart")).define("chart", ["d3", "params", "sankey", "data", "color", "DOM", "width"], function (d3, params, sankey, data, color, DOM, width) {
        const svg = d3.select("#graph")
            .append("svg")
            .attr("width", 400)
            .attr("height", 400);

        const { nodes, links } = sankey(data);

        svg.append("g")
            .attr("transform", `translate(${params.plot.x}, ${params.plot.y})`)
            .selectAll("rect")
            .data(nodes)
            .join("rect")
            .attr("aria-hidden", true)
            .attr("stroke", d => d3.color(color(d)).darker(0.5))
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("height", "50px")
            .attr("width", "10px")
            .attr("fill", color)
            .on('mouseover', showLinks)
            .on('mouseout', hideLinks);

        const link = svg.append("g")
            .attr("fill", "none")
            .attr("stroke-opacity", 0.5)
            .selectAll("g")
            .data(links)
            .join("g")
            .style("mix-blend-mode", "multiply");

        const gradient = link.append("linearGradient")
            .attr("id", d => (d.uid = DOM.uid("link")).id)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", d => d.source.x1)
            .attr("x2", d => d.target.x0);

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d => color(d.source));

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d => color(d.target));

        link.append("path")
            .attr("transform", `translate(${params.plot.x}, ${params.plot.y})`)
            .attr("aria-hidden", true)
            .attr("d", d => `M` + d.source.x1 + " " + (d.source.y0 + 10 * d.value) + " L" + d.target.x0 + " " + (d.target.y0 + 10 * d.value))
            .attr("stroke", d => d.uid)
            .attr("stroke-width", 2.5);


        svg.append("g")
            .attr("transform", `translate(${params.plot.x}, ${params.plot.y})`)
            .attr("font-family", "'Source Sans Pro', sans-serif")
            .attr("font-size", 10)
            .attr("fill", "#202630")
            .selectAll("text")
            .data(nodes)
            .join("text")
            .attr("x", d => (d.x0 + 1.5))
            .attr("y", d => d.y0 + 25)
            .attr("dy", "0.35em")
            .attr("text-anchor", d => d.x0 + 25 < width / 2 ? "start" : "end")
            .text(d => labelNode(d));

        function labelNode(d) {
            return `${d.name}`;
        }

        function showLinks(d) {
            const linkedNodes = [];

            let traverse = [{
                linkType: 'sourceLinks',
                nodeType: 'target',
            }, {
                linkType: 'targetLinks',
                nodeType: 'source',
            }];

            traverse.forEach((step) => {
                d[step.linkType].forEach((l) => {
                    linkedNodes.push(l[step.nodeType]);
                });
            });

            d3.selectAll('rect').style(
                'opacity',
                r => linkedNodes.find(remainingNode => remainingNode.name === r.name) ? '1' : '0.1'
            );
            d3.select(this).style('opacity', '1');
            d3.selectAll('path').style(
                'opacity',
                p => (p && (p.source.name === d.name || p.target.name === d.name)) ? '1' : '0.1'
            );
        }

        function hideLinks() {
            d3.selectAll('rect').style('opacity', '1');
            d3.selectAll('path').style('opacity', '1');
        }

        return svg.node();
    }
    );

    main.variable().define("csv", function () {
        return (
            DATA
        )
    });

    main.variable().define("data", ["d3", "csv"], async function (d3, csv) {
        const links = d3.csvParse(await csv, d3.autoType);
        console.log(links);
        const nodes = Array.from(
            new Set(links.flatMap(l => [l.source, l.target])),
            name => ({ name, category: name }));
        return { nodes, links, units: "things" };
    }
    );

    main.variable().define("sankey", ["d3", "params"], function (d3, params) {
        const sankey = d3.sankey()
            .nodeId(d => d.name)
            .nodeAlign(d3[`sankeyLeft`])
            .nodeWidth(10)
            .nodePadding(48)
            .extent([[1, 5], [params.svg.width - 1, params.plot.height - 5]]);
        sankey.linkSort(null);
        return ({ nodes, links }) => sankey({
            nodes: nodes.map(d => Object.assign({}, d)),
            links: links.map(d => Object.assign({}, d))
        });
    }
    );
    main.variable().define("color", ["d3"], function (d3) {
        const color = d3.scaleOrdinal().range(["rgb(255, 0, 0)", "rgb(255, 0, 255)", "rgb(102, 0, 204)", "rgb(0, 204, 255)", "rgb(0, 153, 255)", "rgb(51, 153, 153)", "rgb(0, 255, 51)", "rgb(153, 153, 153)", "rgb(200, 200, 200)"]);
        return d => color(d.category === undefined ? d.name : d.category);
    }
    );
    main.define("initial params", function () {
        let output = {};

        output["svg"] = {
            "width": 400,
            "height": 400
        };

        output["margin"] = {
            "top": 72,
            "right": 0,
            "bottom": 72,
            "left": 0
        };

        output["plot"] = {
            "x": output["margin"]["left"],
            "y": output["margin"]["top"],
            "width": output["svg"]["width"] - output["margin"]["left"] - output["margin"]["right"],
            "height": output["svg"]["height"] - output["margin"]["top"] - output["margin"]["bottom"]
        };

        return output;
    }
    );
    main.variable().define("mutable params", ["Mutable", "initial params"], (M, _) => new M(_));
    main.variable().define("params", ["mutable params"], _ => _.generator);
    main.variable().define("d3", ["require"], function (require) {
        return (
            require("d3@5", "d3-sankey@0.12", "d3-color")
        )
    });
    return main;
}
