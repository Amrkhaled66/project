import { BLANKET_SIZES } from "src/data/blanketSizes";
import type { DesignData } from "src/types/design.types";
import type { DesignEditorAction } from "src/types/desgin/editor.types";
import {
  applyUpgradeSelectionRules,
  filterEmbroideryZonesForSelectedUpgrades,
} from "src/utils/designRules";
import { initialDesignState } from "src/utils/designInitialState";

export const designReducer = (
  state: DesignData,
  action: DesignEditorAction,
): DesignData => {
  switch (action.type) {
    case "hydrate":
      return {
        ...initialDesignState,
        ...action.designData,
      };

    case "set-blanket-color":
      return {
        ...state,
        colors: {
          ...state.colors,
          blanket: action.color,
        },
      };

    case "set-border-color":
      return {
        ...state,
        colors: {
          ...state.colors,
          border: action.color,
        },
      };

    case "set-backing-color":
      return {
        ...state,
        colors: {
          ...state.colors,
          backing: action.color,
        },
      };

    case "set-binding-color":
      return {
        ...state,
        colors: {
          ...state.colors,
          binding: action.color,
        },
      };

    case "set-blocking":
      return {
        ...state,
        colors: {
          ...state.colors,
          blocking: {
            colors: action.colors,
            random: action.random,
          },
        },
      };

    case "set-quality-preserve-color":
      return {
        ...state,
        colors: {
          ...state.colors,
          qualityPreserve: action.color,
        },
      };

    case "toggle-upgrade": {
      const nextSelected = applyUpgradeSelectionRules(
        state.upgrades.selected.map(String),
        action.id,
      );
      const filteredZones = filterEmbroideryZonesForSelectedUpgrades(
        nextSelected,
        state.upgrades.props.embroidery.zones,
      );

      return {
        ...state,
        upgrades: {
          ...state.upgrades,
          selected: nextSelected,
          props: {
            ...state.upgrades.props,
            embroidery: {
              ...state.upgrades.props.embroidery,
              zones: filteredZones,
            },
          },
        },
      };
    }

    case "set-canvas-size":
      return {
        ...state,
        canvas: {
          size: action.size.size,
          rows: action.size.rows,
          cols: action.size.cols,
        },
      };

    case "set-panel-size":
      return {
        ...state,
        panelSize: action.panelSize,
      };

    case "replace-photos":
      return {
        ...state,
        photos: {
          ...state.photos,
          items: action.items,
        },
      };

    case "append-photos":
      return {
        ...state,
        photos: {
          ...state.photos,
          items: [...state.photos.items, ...action.items],
        },
      };

    case "remove-photo":
      return {
        ...state,
        photos: {
          ...state.photos,
          items: state.photos.items.filter((item: any) => item.id !== action.id),
        },
      };

    case "set-embroidery-zones":
      return {
        ...state,
        upgrades: {
          ...state.upgrades,
          props: {
            ...state.upgrades.props,
            embroidery: {
              ...state.upgrades.props.embroidery,
              zones: action.zones,
            },
          },
        },
      };

    case "set-corner-image":
      return {
        ...state,
        upgrades: {
          ...state.upgrades,
          props: {
            ...state.upgrades.props,
            cornerstones: {
              ...state.upgrades.props.cornerstones,
              images: {
                ...state.upgrades.props.cornerstones.images,
                [action.index]: action.url,
              },
            },
          },
        },
      };

    case "remove-corner-image": {
      const nextImages = { ...state.upgrades.props.cornerstones.images };
      delete nextImages[action.index];

      return {
        ...state,
        upgrades: {
          ...state.upgrades,
          props: {
            ...state.upgrades.props,
            cornerstones: {
              ...state.upgrades.props.cornerstones,
              images: nextImages,
            },
          },
        },
      };
    }

    case "reset": {
      const size =
        BLANKET_SIZES.find((item) => item.id === state.startingSize) ??
        BLANKET_SIZES[0];

      return {
        ...initialDesignState,
        startingSize: state.startingSize,
        canvas: {
          size: state.startingSize,
          rows: size.rows,
          cols: size.cols,
        },
      };
    }

    default:
      return state;
  }
};
