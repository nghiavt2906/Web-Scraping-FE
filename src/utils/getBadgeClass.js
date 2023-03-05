import SEARCH_STATUS from "../constants/search_status";

const getBadgeClass = (status) => {
  switch (status) {
    case SEARCH_STATUS.SUCCESS:
      return "success";
    case SEARCH_STATUS.PROCESSING:
      return "primary";
  }
};

export default getBadgeClass;
