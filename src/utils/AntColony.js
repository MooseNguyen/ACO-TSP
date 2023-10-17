export function CreateAntColony(p, nodes) {
  class AntColony {
    constructor(
      colony_size,
      alphaColony,
      betaColoy,
      evaporation,
      pheromone_d,
      maxi,
      min_scalar
    ) {
      this.graph = new Graph();
      this.colony = [];
      this.colonySize = colony_size;
      this.alpha = alphaColony; 
      this.beta = betaColoy; 
      this.evaporation = evaporation; 
      this.q = pheromone_d; 
      this.initPheromone = this.q;
      this.maxIterations = maxi;
      this.minScalingFactor = min_scalar;
      this.iteration = 0;

      this.bestRoute = null;
      this.globalBest = null;

      this.createGraphAndCitys();
    }

    createAnts() {
      this.colony = [];
      for (let i = 0; i < this.colonySize; i++) {
        this.colony.push(new Ant(i, this.graph, this.alpha, this.beta, this.q));
      }
    }

    createGraphAndCitys() {
      for (let i = 0; i < nodes.length; i++) {
        this.graph.nodes.push(new Node(nodes[i].x, nodes[i].y));
      }
      this.graph.generateNodesEdges();
    }

    reset() {
      this.iteration = 0;
      this.globalBest = null;
      this.resetAnts();
      this.setInitialPheromone(this.initPheromone);
      this.graph.resetPheromone();
    }

    setInitialPheromone() {
      let edges = this.graph.getEdges;
      for (let edgeIndex in edges) {
        edges[edgeIndex].setInitialPheromone(this.initPheromone);
      }
    }

    ready() {
      if (this.graph.getnodesSize <= 1) {
        return false;
      }
      return true;
    }

    run() {
      let _this = this;

      _this.iteration = 0;
      _this.iteration = setInterval(function () {
        _this.maxIterations--;
        _this.prepare();
        if (_this.maxIterations === 0) {
          clearInterval(_this.iteration);
          _this.drawBestTour();
        }
      }, 10);
    }

    prepare() {
      this.moveAnts();
      this.updateTrails();
      this.getGlobalBest();
    }

    moveAnts() {
      for (let antIndex in this.colony) {
        this.colony[antIndex].run();
      }
    }

    drawBestTour() {
      let bestAnt = this.getGlobalBest();
      let bestTour = bestAnt.getTour;

      for (let i = 0; i < bestTour.size() - 1; i++) {
        p.stroke(120,2,6);
        p.strokeWeight(4);
        p.noFill();
        p.beginShape();
        p.line(
          bestTour.getTour(i).x,
          bestTour.getTour(i).y,
          bestTour.getTour(i + 1).x,
          bestTour.getTour(i + 1).y
        );
        p.endShape();
      }
    }

    getGlobalBest() {
      let bestAnt = this.getBestRoute();

      if (
        this.globalBest == null ||
        this.globalBest.getTour.tourDistance >= bestAnt.getTour.tourDistance
      ) {
        this.globalBest = bestAnt;
      }

      return this.globalBest;
    }

    getBestRoute() {
      if (this.bestRoute == null) {
        let best = this.colony[0];

        for (let antIndex in this.colony) {
          if (
            best.getTour.tourDistance >=
            this.colony[antIndex].getTour.tourDistance
          ) {
            this.bestRoute = this.colony[antIndex];
          }
        }
      }
      return this.bestRoute;
    }

    updateTrails() {
      let edges = this.graph.getEdges;
      for (let edgeIndex in edges) {
        let pheromone = edges[edgeIndex].getPheromone();
        edges[edgeIndex].setPheromone(pheromone * this.evaporation);
      }
      for (let antIndex in this.colony) {
        this.colony[antIndex].addTrailsPheromone();
      }
    }

    resetAnts() {
      this.createAnts();
      this.bestRoute = null;
    }
  }

  class Graph {
    constructor() {
      this.nodes = [];
      this.edges = {};
    }

    generateNodesEdges() {
      this.edges = {};
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i; j < this.nodes.length; j++) {
          this.addEdge(this.nodes[i], this.nodes[j]);
        }
      }
    }

    addEdge(node1, node2) {
      this.edges[node1 + '-' + node2] = new Edge(node1, node2);
    }

    resetPheromone() {
      for (let edgeIndex in this.edges) {
        this.edges[edgeIndex].resetPheromone();
      }
    }

    getEdge(node1, node2) {
      return this.edges[node1 + '-' + node2];
    }

    get getEdges() {
      return this.edges;
    }

    get getnodesSize() {
      return this.nodes.length;
    }

    getNode(index) {
      return this.nodes[index];
    }

    get getNodes() {
      return this.nodes;
    }

    size() {
      return this.nodes.length;
    }
  }

  class Edge {
    constructor(node1, node2) {
      this.node1 = node1;
      this.node2 = node2;
      this.initPheromone = 1;
      this.pheromone = this.initPheromone;
      this.distance = this.distanceNodes(node1, node2);
    }

    distanceNodes(node1, node2) {
      return p.dist(node1.x, node1.y, node2.x, node2.y);
    }

    setInitialPheromone(pheromone) {
      this.initPheromone = pheromone;
    }
    setPheromone() {
      this.pheromone = this.initPheromone;
    }
    resetPheromone() {
      this.pheromone = this.initPheromone;
    }
    getPheromone() {
      return this.pheromone;
    }
    getDistance() {
      return this.distance;
    }
  }

  class Tour {
    constructor(graph) {
      this.graph = graph;
      this.tour = [];
      this.distance = null;
    }

    toString() {
      return this.x + ',' + this.y;
    }

    size() {
      return this.tour.length;
    }

    addCity(city) {
      this.distance = null;
      this.tour.push(city);
    }

    getTour(tourIndex) {
      return this.tour[tourIndex];
    }

    contains(city) {
      for (let tourIndex in this.tour) {
        if (city.isEqual(this.tour[tourIndex])) {
          return true;
        }
      }
      return false;
    }

    get tourDistance() {
      if (this.distance == null) {
        let distance = 0.0;

        for (let i = 0; i < this.tour.length - 1; i++) {
          let edge = this.graph.getEdge(this.tour[i + 1], this.tour[i + 1]);
          distance += edge.getDistance();
        }

        this.distance = distance;
      }
      return this.distance;
    }
  }

  class Ant {
    constructor(id, graph, alpha, beta, q) {
      this.antID = id;
      this.graph = graph;
      this.alpha = alpha;
      this.beta = beta;
      this.q = q;
      this.tour = null;
    }

    run() {
      this.reset();
      while (!this.checkTour()) {
        this.visitNextNode();
      }
    }

    init() {
      this.tour = new Tour(this.graph);
      let randCityIndex = Math.floor(Math.random() * this.graph.getnodesSize);
      this.currentCity = this.graph.getNode(randCityIndex);
      this.tour.addCity(this.currentCity);
    }

    reset() {
      this.tour = null;
    }

    visitNextNode() {
      if (this.tour == null) {
        this.init();
      }

      let nodes = this.graph.getNodes;

      let cityProbabilities = [];
      cityProbabilities = this.calculateProbabilities(nodes, cityProbabilities);

      this.updateCities(nodes, cityProbabilities);

      if (this.tour.size() === this.graph.size()) {
        // Return to the initial city
        let initialCity = this.tour.getTour(0);
        this.tour.addCity(initialCity);
      }
    }

    updateCities(nodes, cityProbabilities) {
      let random_value = Math.random();
      let wheel_position = 0.0;
      for (let cityIndex in nodes) {
        if (!this.tour.contains(nodes[cityIndex])) {
          wheel_position += cityProbabilities[cityIndex];
          if (wheel_position >= random_value) {
            this.currentCity = nodes[cityIndex];
            this.tour.addCity(nodes[cityIndex]);
            return;
          }
        }
      }
    }

    calculateProbabilities(nodes, cityProbabilities) {
      for (let cityIndex in nodes) {
        if (!this.tour.contains(nodes[cityIndex])) {
          let edge = this.graph.getEdge(this.currentCity, nodes[cityIndex]);
          cityProbabilities[cityIndex] =
            Math.pow(edge.getPheromone(), this.alpha) *
            Math.pow(1.0 / edge.getDistance(), this.beta);
        }
      }
      return cityProbabilities;
    }

    addTrailsPheromone(contribution) {
      let fromCity;
      let toCity;

      if (contribution == undefined) {
        contribution = 1;
      }

      let extraPheromone = (this.q * contribution) / this.tour.tourDistance;
      for (let i = 0; i < this.tour.size() - 1; i++) {
        fromCity = this.tour.getTour(i);
        toCity = this.tour.getTour(i + 1);
        let edge = this.graph.getEdge(fromCity, toCity);
        let pheromone = edge.getPheromone();
        edge.setPheromone(pheromone + extraPheromone);
        this.drawAntJourney(fromCity.x, fromCity.y, toCity.x, toCity.y);
      }
    }

    drawAntJourney(fromCityX, fromCityY, toCityX, toCityY) {
      p.stroke(255);
      p.strokeWeight(1);
      p.noFill();
      p.beginShape();
      p.line(fromCityX, fromCityY, toCityX, toCityY);
      p.endShape();
    }

    checkTour() {
      if (this.tour == null) {
        return false;
      }
      return this.tour.size() >= this.graph.size();
    }

    get getTour() {
      return this.tour;
    }
  }

  class Node {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.color = '#fff';
      this.active = false;
    }

    show() {
      p.noStroke();
      p.fill(this.color);
      p.ellipse(this.x, this.y, 15, 15);
    }

    calcDistance(points) {
      let sum = 0;
      for (let i = 0; i < points.length - 1; i++) {
        let d = p.dist(
          points[i].x,
          points[i].y,
          points[i + 1].x,
          points[i + 1].y
        );
        sum += d;
      }
      return sum;
    }

    isEqual(node) {
      if (this.x == node.x && this.y == node.y) {
        return true;
      }
      return false;
    }
  }

  return { AntColony };
}
