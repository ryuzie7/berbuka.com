/**
 * Type declarations for the View Transitions API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
 */

interface ViewTransition {
  /** Promise that resolves once the transition animation is finished */
  finished: Promise<void>;
  /** Promise that resolves once the pseudo-element tree is created and the animation is about to start */
  ready: Promise<void>;
  /** Promise that resolves once the callback passed to startViewTransition() returns */
  updateCallbackDone: Promise<void>;
  /** Skips the animation part of the view transition */
  skipTransition(): void;
}

interface Document {
  /**
   * Starts a new view transition.
   * @param callback A callback function typically invoked to update the DOM
   * @returns A ViewTransition object
   */
  startViewTransition?(callback: () => void | Promise<void>): ViewTransition;
}
