import CreationFormView from '../view/creation-form-view';
import EditingFormView from '../view/editing-form-view';
import SortingView from '../view/sorting-view';
import Point from '../view/point-view';
import PointListView from '../view/point-list-view';
import {render} from '../render';
import { isEscapeKey } from '../util';

export default class BoardPresenter {
  #pointListComponent = new PointListView();
  #boardContainer = null;
  #pointsModel = null;
  #points = null;

  constructor ({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    render(new SortingView(), this.#boardContainer);
    render(this.#pointListComponent, this.#boardContainer);
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i])
    }
  }

  #renderPoint = (point) => {
    const pointComponent = new Point(point);
    const pointEditComponent = new EditingFormView(point);

    const replacePointToForm = () => {
      this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element)
      document.body.addEventListener('keydown', closeFormOnEscape());
    };

    const replaceFormToPoint = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element)
      document.body.removeEventListener('keydown', closeFormOnEscape());
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replacePointToForm();
      
    });

    pointEditComponent.element.querySelector('.event__save-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

    const closeFormOnEscape = (evt) => {
      console.log(evt);
      if(isEscapeKey(evt)) {
        console.log('escape');
        evt.preventDefault();
        replaceFormToPoint();
      }
    }

    render(pointComponent, this.#pointListComponent.element);
  }
}
