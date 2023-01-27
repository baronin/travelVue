<template>
  <button
    :class="modifier"
    type="button"
    class="btn"
    @click="$emit('button-click')"
  >
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'AppButton',

    props: {
      /**
       * Extra classes
       */
      modifier: {
        required: false,
        type: String,
        default: '',
      },
    },
  };
</script>

<style lang="scss">
  .btn {
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    color: $color-white;
    cursor: pointer;
    outline-color: $color-blue-fifteen-opacity;
  }

  .link {
    color: $color-blue;
    padding: 0;
    background-color: transparent;
  }

  .is-primary {
    padding: 15px 35px;
    width: 100%;
    font-weight: 500;
    border-radius: 4px;
    background-color: $color-blue;
    outline: none;
    box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.1);

    &:hover,
    &:focus {
      background-color: $color-blue-shade;
    }

    &:active {
      box-shadow: none;
    }
  }

  .is-info {
    display: inline-block;
    background-color: $color-orange;
    box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: $color-orange-hover;
    }

    &:active {
      box-shadow: none;
    }
  }

  .is-secondary {
    position: relative;
    text-align: left;
    font-size: $font-size-medium;
    font-weight: bold;
    color: $color-blue-medium;
    background-color: $color-blue-shade-light;
    box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 0.1px;

    &:hover,
    &:focus {
      background-color: $color-blue-light;
    }

    @include tablet {
      padding: 14px 40px;
    }
  }

  .arrow {
    position: relative;
    padding: 0 15px 0 0;

    &:before {
      content: '';
      position: absolute;
      top: 9px;
      left: 73px;
      width: 8px;
      height: 1px;
      border-radius: 1px;
      background: #6DB3F1;
      transform: rotate(130deg);
    }

    &:after {
      content: '';
      position: absolute;
      top: 9px;
      left: 78px;
      width: 8px;
      height: 1px;
      border-radius: 1px;
      background: #6DB3F1;
      transform: rotate(230deg);
    }

    &-active {

      &:before {
        transform: rotate(50deg);
      }

      &:after {
        transform: rotate(-50deg);
      }
    }
  }

  .is-btn-active {
    &:before {
      transform: rotate(180deg);
    }

    &:after {
      transform: rotate(180deg);
    }
  }

  .is-icon-arrow {
    width: 10px;
    height: 10px;
    padding: 0;
    background: url("../../img/btn/arrow-down-gray.png") no-repeat center;
    cursor: pointer;
    transition: all 0.2s ease-out;

    &:focus {
      outline-color: $color-blue-medium;
    }

    &-active {
      transform: rotate(180deg);
    }
  }

  .is-reverse-button {
    position: absolute;
    top: 50%;
    right: 10px;
    padding: 0;
    background-color: $color-white;
    color: $color-black;
    transform: translateY(-50%);
  }

  .is-close {
    position: relative;
    padding: 10px;
    background: none;
    border: none;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      display: block;
      width: 1px;
      height: 21px;
      background-color: $color-gray-medium;
      transform: rotate(45deg);
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      display: block;
      width: 1px;
      height: 21px;
      background-color: $color-gray-medium;
      transform: rotate(-45deg);
    }
  }

  .is-btn-counter {
    padding: 0;
    background-color: inherit;
    color: $color-white;
    outline: transparent;

    &:focus {
      box-shadow: 0 0 7px 0 $color-dark-main;
    }
  }

  .is-minus,
  .is-plus {
    position: relative;
    width: 33px;
    height: 33px;
    border: 1px solid $color-dark-main;
    border-radius: 50%;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 15px;
      left: 10px;

      width: 11px;
      height: 1px;
      background: $color-dark-main;
    }
  }

  .is-plus::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 10px;
    transform: rotate(90deg);

    width: 11px;
    height: 1px;
    background: $color-dark-main;
  }

  .is-minus:disabled,
  .is-plus:disabled {
    border-color: $color-gray-light;

    &:before,
    &:after {
      background-color: $color-gray-light;
    }
  }
</style>
