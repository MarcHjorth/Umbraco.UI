import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { queryAll, queryAssignedElements } from 'lit/decorators.js';
import { UUIModalElement } from '@umbraco-ui/uui-modal/lib';
import { UUIModalSidebarElement } from '@umbraco-ui/uui-modal-sidebar/lib';

/**
 * @element uui-modal-container
 */
@defineElement('uui-modal-container')
export class UUIModalContainerElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
        position: relative;
      }
    `,
  ];

  @queryAssignedElements({
    selector:
      'uui-modal-dialog:not([closing]), uui-modal-sidebar:not([closing])',
    flatten: true,
  })
  modals?: UUIModalElement[];

  @queryAssignedElements({
    selector: 'uui-modal-sidebar:not([closing])',
    flatten: true,
  })
  sidebars?: UUIModalSidebarElement[];

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('open', this._onModalOpen);
    this.addEventListener('closing', this._onModalClosing);
  }

  private _onModalOpen(event: Event) {
    const modal = event.target as UUIModalElement;
    const index = this.modals!.indexOf(modal);
    if (index === 0) {
      modal.showBackdrop();
    }
  }

  private _onModalClosing(event: Event) {
    const modal = event.target as UUIModalElement;
    modal?.toggleAttribute('backdrop', false);

    this._onSlotChange(event);
  }

  private _onSlotChange(event: Event): void {
    if (!this.modals) return;

    this.modals[0]?.toggleAttribute('backdrop', true);

    this.sidebars?.forEach((sidebar, i) => {
      const maxStack = 4;
      const startPush = this.sidebars!.length - 1 >= maxStack ? 1 : 0;
      const push =
        (this.sidebars!.length - 1 - i - Math.max(0, 3 - i)) * startPush; //TODO: this can be optimized with some math clamps

      sidebar.setAttribute('data-modal-shrink', Math.min(i, 3).toString());
      sidebar.setAttribute('data-modal-push', Math.min(push, 5).toString());

      const layer = this.sidebars!.length - 1 - i;

      if (layer === 4 && i !== 0) {
        // The first layer has the backdrop and should always be visible so there is no need to show it
        sidebar.show();
      }
      if (layer === 5 && i !== 0) {
        // The first layer has the backdrop and should always be visible
        sidebar.hide();
      }
    });

    this.modals.forEach((modal, i) => {
      if (i === this.modals!.length - 1) {
        modal.toggleAttribute('fade', false);
      } else {
        modal.toggleAttribute('fade', true);
      }
    });
  }

  render() {
    return html`<slot @slotchange=${this._onSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-container': UUIModalContainerElement;
  }
}
