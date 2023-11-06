let initialState = [];

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "allData":
            console.log(action.payload)
            return state = action.payload
        case "Clear":
            return state = "";
        default:
            return state
    }
}