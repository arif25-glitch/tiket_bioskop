import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    isMenuOpen: boolean;
    // Add other UI states like loading indicators, modal visibility, etc.
}

const initialState: UiState = {
    isMenuOpen: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        setMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isMenuOpen = action.payload;
        },
        // Add other actions here
    },
});

// Action creators are generated for each case reducer function
export const { toggleMenu, setMenuOpen } = uiSlice.actions;

export default uiSlice.reducer;
