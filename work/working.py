import networkx as nx

# 建立一個有向圖
G = nx.DiGraph()

# 添加節點和邊
G.add_node("A")
G.add_node("B")
G.add_node("C")
G.add_node("D")
G.add_node("E")

G.add_edge("A", "B", weight=4)
G.add_edge("A", "C", weight=2)
G.add_edge("B", "C", weight=5)
G.add_edge("B", "D", weight=10)
G.add_edge("C", "D", weight=3)
G.add_edge("D", "E", weight=8)
G.add_edge("E", "A", weight=1)

# 計算最短路徑
shortest_path = nx.dijkstra_path(G, source="A", target="E", weight="weight")
shortest_distance = nx.dijkstra_path_length(G, source="A", target="E", weight="weight")

print("最短路徑:", shortest_path)
print("最短距離:", shortest_distance)