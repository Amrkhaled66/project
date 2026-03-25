import BlanketColor from "src/components/Profile/Design/DesignWidget/BlanketColor";
import BorderColor from "src/components/Profile/Design/DesignWidget/BorderColor";
import BackingColorSelector from "src/components/Profile/Design/DesignWidget/BackingColor";
import BindingColor from "src/components/Profile/Design/DesignWidget/BindingColor";
import BlockingColor from "src/components/Profile/Design/DesignWidget/BlockingColor";
import QualityPreserveColor from "src/components/Profile/Design/DesignWidget/QualityPreservedColor";

import { useDesign } from "src/context/desgin.context";

const ColorGrid = () => {
  const { hasBinding, hasBlocking, hasQualityPreserve } = useDesign();
  return (
    <div className="grid gap-4">
      <BlanketColor />
      <BorderColor />
      {hasBinding && <BindingColor />}
      {hasBlocking && <BlockingColor />}
      {hasQualityPreserve && <QualityPreserveColor />}
      <BackingColorSelector />
    </div>
  );
};
export default ColorGrid;
