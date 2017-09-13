import MapView from './MapView';
import Marker from './Marker';
import Polyline from './Polyline';
import Circle from './Circle';
import AnimatedRegion from './AnimatedRegion';

MapView.Marker = Marker;
MapView.Marker.Animated = Marker;
MapView.Polyline = Polyline;
MapView.Circle = Circle;
MapView.AnimatedRegion = AnimatedRegion;

export { Marker, Polyline, Circle, AnimatedRegion };
export default MapView;
