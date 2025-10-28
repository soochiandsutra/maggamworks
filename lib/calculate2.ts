// what is size factor? 
// difference 
// neck shape factor?
// blouse bottom??


// Multipliers

const SIZE_FACTOR_MULLTIPLIERS = {
}

const NECKSHAPE_FILL_WORK_MULTIPLIERS = {
};

const FRONT_NECK_TYPE_MULTIPLITERS = {
    'boat-neck': 1.0,
    'deep-neck': 2.0,
    'madubala-neck': 3.8,
    'patchwork-neck': 1.1,
    'bridal-neck': 1.5,
    'V-neck': 0.1
};


const BACK_NECK_TYPE_MULTIPLITERS = {

};


const HANDS_BORDER_TYPE_MULTIPLITERS = {
    '1': 'formula1',
    '2': 'formula2',
    '3': 'formula3',
    '4': 'formula4',
}; //formula based


const TOTAL_TIME = 40 + ( FRONT_TOTAL_TIME + BACK_TOTAL_TIME + HANDS_TOTAL_TIME ) 

// Front Total Time
const FRONT_TOTAL_TIME = ( FRONT_BORDER_TIME + FRONT_MOTIF_TIME + FRONT_FILL_WORK_TIME) * COVERAGE * WORK_TYPE_MULTIPLIER;

    // Front Border Time
    const FRONT_BORDER_TIME = FRONT_NECK_TYPE_MULTIPLITERS * FRONT_BORDER_THICKNESS * SIZE_FACTOR_MULLTIPLIERS 

    // Front Motif Time
    const FRONT_MOTIF_TIME = ( FRONT_MOTIF_SIZE_X * FRONT_MOTIF_SIZE_Y ) * FRONT_MOTIF_COUNT 
    
    // Front Fill Work Time
    const FRONT_FILL_WORK_TIME = FRONT_NECKSHAPE_DEDUSER * SIZE_FACTOR

        const FRONT_NECKSHAPE_DEDUSER = 



// Back Total Time
const BACK_TOTAL_TIME = BACK_BORDER_TIME + BACK_MOTIF_TIME + BACK_FILL_WORK_TIME;


// Hands Total Time
// const HANDS_TOTAL_TIME

const HANDS_TOTAL_TIME = HANDS_BORDER_TIME + HANDS_MOTIF_TIME + HANDS_FILL_WORK_TIME;



export function calculate(): number {
    // This would need to use the store in a real implementation
    // For now, return a placeholder
    return TOTAL_TIME;
  } 