import streamlit as st
import pandas as pd

# Load cleaned data
df = pd.read_csv('data/cleaned_Retail_data.csv', parse_dates=['Order Date'])

# Title
st.title("Supermart Sales Dashboard")

# Sidebar filter
regions = st.sidebar.multiselect(
    "Select Region(s)", 
    options=df['Region'].unique(), 
    default=list(df['Region'].unique())
)
df_filt = df[df['Region'].isin(regions)]

# Time-series chart of daily sales
daily_sales = df_filt.groupby('Order Date')['Sales'].sum()
st.subheader("Daily Sales Trend")
st.line_chart(daily_sales)

# Category-wise sales breakdown
cat_sales = df_filt.groupby('Category')['Sales'].sum().sort_values(ascending=False)
st.subheader("Sales by Category")
st.bar_chart(cat_sales)
