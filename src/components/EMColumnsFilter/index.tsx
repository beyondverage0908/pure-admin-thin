import { defineComponent, PropType, ref, toRefs, unref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import "./index.scss";

interface EmColumnsFilterInstace {
  updateColumns: (columns: Props["columns"]) => void;
}

enum Position {
  left = "left",
  right = "right"
}

type Column = {
  label: string;
  prop: string;
  show?: boolean;
};

interface Props {
  columns: Array<Column>;
}

// interface Emits {
//   (e: "on-columns-filter", v: Column[]): void;
// }

// 判断外部传入是否存在初始化列表的时候就默认展示的列，其他是需要选择后才能显示的列
function getRefectComumns(columns: Array<Column>) {
  const hasShow = !!columns.find(item => item.show);
  const hasNotShow = !!columns.find(item => item.show === false);
  if (hasShow || hasNotShow)
    return columns.map(item => {
      if (item.show === false) {
        return item;
      }
      return { ...item, show: true };
    });
  return columns.map(item => ({ ...item, show: true }));
}

const EmColumnsFilter = defineComponent({
  props: {
    columns: {
      type: Array as PropType<Props["columns"]>,
      default: () => [],
      validator: (columns: Array<Column>) => {
        const hasLabel = columns.filter(item => !!item.label).length > 0;
        if (!hasLabel) {
          console.warn(
            "warning: 使用EmColumnsFilter组件，属性columns: Array<column>传入的子对象column中，label是必须的"
          );
          return false;
        }
        return true;
      }
    },
    position: {
      type: String,
      default: () => Position.right,
      validator: (v: Position) => {
        return [Position.left, Position.right].indexOf(v) > -1;
      }
    }
  },
  emits: ["on-columns-filter"],
  setup(props, { expose, emit }) {
    const { columns } = toRefs(props);
    const checkColumns = ref(getRefectComumns(unref(columns)));

    const updateColumns = (columns: Props["columns"]) => {
      console.log(columns);
    };
    const publicMethods: EmColumnsFilterInstace = {
      updateColumns
    };
    expose(publicMethods);

    const target = ref(null);
    onClickOutside(target, _ => {
      isShowCheckBox.value = false;
    });

    const isShowCheckBox = ref<boolean>(false);

    const handleClick = () => {
      isShowCheckBox.value = !isShowCheckBox.value;
    };

    const handleCheckboxChange = (isCheck: boolean, item: Column) => {
      item.show = isCheck;
      emit("on-columns-filter", checkColumns.value);
    };
    // 载入的时候默认触发一次filter
    onMounted(() => {
      emit("on-columns-filter", checkColumns.value);
    });

    const Button = () => (
      <button class="em-columns-filter-button" onClick={handleClick}>
        <el-icon color="#999">
          <grid />
        </el-icon>
        <el-icon color="#333">
          <caret-bottom />
        </el-icon>
      </button>
    );

    const CheckBox = () => (
      <div class="em-columns-filter-checkbox">
        {checkColumns.value.map(item => (
          <p>
            <el-checkbox
              label={item.label}
              model-value={item.show}
              onChange={isCheck => handleCheckboxChange(isCheck, item)}
            />
          </p>
        ))}
      </div>
    );

    const Container = () => (
      <div class="em-columns-filter-container" ref={target}>
        <Button></Button>
        {isShowCheckBox.value ? <CheckBox /> : null}
      </div>
    );

    return () => <Container />;
  }
});

export default EmColumnsFilter;
