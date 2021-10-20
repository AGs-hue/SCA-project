// This contains all the states and their possible transitions
export const PACKAGE_TRANSITION_STATES = {
  PICKED_UP: ['IN_TRANSIT'],
  IN_TRANSIT: ['WAREHOUSE'],
  WAREHOUSE: ['IN_TRANSIT', 'DELIVERED'],
  DELIVERED: [],
};
