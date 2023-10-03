import { Component, GetFrom, SetTo } from "../lib/index.js";

/**
 * @template {typeof HTMLElement} T
 * @param {T} ClassHTMLElement
 */
export const FromElementToElement = ClassHTMLElement =>
SetTo.Element.mix(SetTo.Abstract.mix(GetFrom.Element.mix(GetFrom.Abstract.mix(Component.mix(ClassHTMLElement)))))

/**
 * @template {typeof HTMLElement} T
 * @param {T} ClassHTMLElement
 */
export const FromRequestToElement = ClassHTMLElement =>
SetTo.RequestTo.mix(SetTo.Abstract.mix(GetFrom.Request.mix(Component.mix(ClassHTMLElement))))

export default {
  FromElementToElement,
  FromRequestToElement
}
