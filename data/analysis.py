import pandas as pd
from pathlib import Path
import matplotlib.pyplot as plt

try:
    df = pd.concat(map(lambda csv_file: pd.read_csv(csv_file, index_col=None, header=None, names=[
        "block number", "timestamp", "contract address", "from", "to", "value"]), Path(r'./').rglob('*.csv')), axis=0, ignore_index=True)
    
except ValueError:
    print("No CSV files have been generated yet")
    print("Check the `data` in a few minutes, and run the command: ")
    print("`poetry run python analysis.py`")

else:
    df['datetime'] = pd.to_datetime(df['timestamp'])

    df.sort_values(["timestamp", "from", "value"], inplace=True)

    sumDf = df.groupby(df.datetime.dt.date)['value'].sum()

    plt.figure().set_figwidth(20)
    plt.figure().set_figheight(10)
    sumDf.plot(kind='bar',
               x=0,
               y=1,
               color='green',
               title='Daily Total transfers',
               ylim=(0, 2200000000.0)
               )

    # show the plot
    plt.show()
